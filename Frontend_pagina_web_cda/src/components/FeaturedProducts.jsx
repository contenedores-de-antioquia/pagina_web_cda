"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import "./featuredProducts.css";

const API_URL = "http://localhost:1337";

export default function FeaturedProducts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const router = useRouter();

  const scroll = useCallback((offset) => {
    scrollRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `${API_URL}/api/products?filters[active][$eq]=true&populate=*`,
          {
            cache: "force-cache"
          }
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
    return items.map((p) => {
      const size =
        p.container_categories?.[0]?.nameCategoryContainers || "N/A";

      const image =
        p.images?.[0]?.formats?.medium?.url ||
        p.images?.[0]?.url ||
        "/placeholder.png";

      return {
        id: p.id,
        slug: p.slug,
        name: p.productName,
        size,
        saleValue: p.saleValue,
        rentalValue: p.rentalValue,
        image: image.startsWith("/")
          ? `${API_URL}${image}`
          : image
      };
    });
  }, [items]);

  const formatCOP = (value) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div className="fp-container">
      <h1 className="fp-title">Contenedores con diseños estándar</h1>
      <h2 className="fp-title-text">
        Diseñamos espacios pensados en cada necesidad
      </h2>

      <div className="fp-carousel" ref={scrollRef}>
        {products.map((p, index) => {
          const wappBuy = `https://wa.me/573158246718?text=Hola,%20quiero%20cotizar%20la%20compra%20de%20${p.size}%20${p.name}`;
          const wappRent = `https://wa.me/573158246718?text=Hola,%20quiero%20cotizar%20el%20alquiler%20de%20${p.size}%20${p.name}`;

          return (
            <div
              key={p.id}
              className="fp-card"
              onClick={() => router.push(`/products/${p.slug}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="fp-img-box">
                <img
                  src={p.image}
                  alt={p.name}
                  className="fp-img"
                  loading={index < 2 ? "eager" : "lazy"}
                  decoding="async"
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
                      Venta <strong>{formatCOP(p.saleValue)}</strong>
                    </p>
                  )}

                  {p.rentalValue && (
                    <p className="fp-price">
                      Alquiler <strong>{formatCOP(p.rentalValue)}</strong>
                    </p>
                  )}
                  <a
                    href={`/products/${p.slug}`}
                    className="fp-btn info"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Más información
                  </a>
                
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="fp-arrows-wrapper">
        <button className="fp-arrow left" onClick={() => scroll(-350)}>
          ‹
        </button>
        <button className="fp-arrow right" onClick={() => scroll(350)}>
          ›
        </button>
      </div>
    </div>
  );
}
