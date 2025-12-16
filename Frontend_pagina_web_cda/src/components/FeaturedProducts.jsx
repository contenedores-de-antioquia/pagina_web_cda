"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import "./featuredProducts.css";

export default function FeaturedProducts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const scrollRef = useRef(null);

  const scroll = useCallback((offset) => {
    scrollRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          "http://localhost:1337/api/products?filters[active][$eq]=true&populate[categories][populate]=*&populate[container_categories][populate]=*",
          { next: { revalidate: 60 } }
        );

        const json = await res.json();
        setItems(json?.data || []);
      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const products = useMemo(() => {
    const base = "http://localhost:1337";

    return items.map((p) => {
      const img = p.images?.[0]?.url
        ? base + p.images?.[0]?.url
        : "/placeholder.png";

      const category =
        p.categories?.[0]?.name ||
        p.categories?.[0]?.title ||
        p.categories?.[0]?.categoryName ||
        "Sin categoría";

      const size =
        p.container_categories?.[0]?.nameCategoryContainers ||
        p.container_categories?.[0]?.size ||
        p.container_categories?.[0]?.name ||
        "N/A";

      return {
        id: p.id,
        slug: p.slug,
        img,
        name: p.productName,
        category,
        size,
        saleValue: p.saleValue,
        rentalValue: p.rentalValue,
        images: p.images
      };
    });
  }, [items]);

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div className="fp-container">
      
      <h1 className="fp-title">Contenedores con diseños estandar</h1>
      <h2 className="fp-title-text">Diseñamos espacios pensados en cada</h2>

      {/* Carrusel con padding izquierdo REAL */}
      <div className="fp-carousel" ref={scrollRef}>
        {products.map((p) => {
          const wappBuy = `https://wa.me/573158246718?text=Hola,%20quiero%20cotizar%20la%20compra%20de%20${p.size}%20${p.name}`;
          const wappRent = `https://wa.me/573158246718?text=Hola,%20quiero%20cotizar%20el%20alquiler%20de%20${p.size}%20${p.name}`;

          return (
            <div className="fp-card" key={p.id}>

              <div className="fp-img-box">
                <img
                  src={
                    p.images?.data?.[0]?.attributes?.formats?.medium?.url
                      ? `http://localhost:1337${p.images.data[0].attributes.formats.medium.url}`
                      : p.images?.data?.[0]?.attributes?.url
                      ? `http://localhost:1337${p.images.data[0].attributes.url}`
                      : "/placeholder.png"
                  }
                  className="fp-img"
                />
              </div>

              <div className="fp-content">

                <h3 className="fp-name">{p.name}</h3>

                <p className="fp-type">
                  <strong>{p.size}</strong>
                </p>

                <div className="fp-prices">
                  {p.saleValue && (
                    <p className="fp-price">
                      Venta <strong>${p.saleValue}</strong>
                    </p>
                  )}

                  {p.rentalValue && (
                    <p className="fp-price">
                      Alquiler <strong>${p.rentalValue}</strong>
                    </p>
                  )}
                </div>
                <div className="fp-buttons">
                    <a href={`/products/${p.slug}`} className="fp-btn info">
                    Más información
                  </a>
                </div>

                <div className="fp-buttons">
                  
                  <a href={wappBuy} target="_blank" className="fp-btn">
                    Comprar ›
                  </a>

                  <a href={wappRent} target="_blank" className="fp-btn rent">
                    Alquilar ›
                  </a>
                  
                </div>

              </div>
            </div>
          );
        })}
      </div>
      {/* Flechas debajo del título */}
      <div className="fp-arrows-wrapper">
        <button className="fp-arrow left" onClick={() => scroll(-350)}>‹</button>
        <button className="fp-arrow right" onClick={() => scroll(350)}>›</button>
      </div>
    </div>
  );
}
