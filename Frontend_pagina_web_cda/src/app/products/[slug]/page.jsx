"use client";

import { useEffect, useState } from "react";
import "./product.css";

export default function ProductPage({ params }) {
  // ✅ Corrección: evitar undefined y mantener orden category → subcategory → slug
  const category = params?.category || "";
  const subcategory = params?.subcategory || "";
  const slug = params?.slug || "";

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(
          `http://localhost:1337/api/products?filters[slug][$eq]=${slug}&populate=*`
        );

        const json = await res.json();
        setProduct(json?.data?.[0] || null);
      } catch (error) {
        console.error("Error cargando producto:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [slug]);

  if (loading) return <p>Cargando...</p>;
  if (!product) return <p>Producto no encontrado.</p>;

  const base = "http://localhost:1337";

  const title = product.productName;
  const description = product.description;

  const images = product.images || [];
  const saleValue = product.saleValue;
  const rentalValue = product.rentalValue;

  const blocks = [
    product.imageMeasurements,
    product.typeOfCoating,
    product.typeOfFloor,
    product.typeOfFinish,
    product.numberOfWindows,
    product.doors,
    product.electricalNetwork,
    product.outlet,
    product.voiceAndData,
    product.switch,
    product.lightning,
    product.airConditioning,
  ].filter(Boolean);

  // ✅ WhatsApp: category → subcategory → slug (sin undefined)
  const whatsappBuy = `https://wa.me/573158246718?text=Hola,%20quiero%20cotizar%20la%20compra%20de%20${encodeURIComponent(
    category
  )}%20/%20${encodeURIComponent(subcategory)}%20/%20${encodeURIComponent(slug)}`;

  const whatsappRent = `https://wa.me/573158246718?text=Hola,%20quiero%20cotizar%20el%20alquiler%20de%20${encodeURIComponent(
    category
  )}%20/%20${encodeURIComponent(subcategory)}%20/%20${encodeURIComponent(slug)}`;

  return (
    <div className="product-page">
      {images?.[0] && (
        <div className="hero-image-box">
          <img
            src={`${base}${images[0].url}`}
            className="hero-image"
            alt={title}
          />
        </div>
      )}

      <h1 className="product-title">{title}</h1>
      <p className="product-subtitle">{description}</p>

      <div className="price-section">
        {saleValue && (
          <div className="price-box">
            <p className="price-label">Venta</p>
            <p className="price-value">${saleValue}</p>
            <p className="price-note">IVA incluido</p>

            <a href={whatsappBuy} target="_blank" className="buy-btn">
              Comprar
            </a>
          </div>
        )}

        {rentalValue && (
          <div className="price-box">
            <p className="price-label">Alquiler</p>
            <p className="price-value">${rentalValue}</p>
            <p className="price-note">IVA incluido</p>

            <a href={whatsappRent} target="_blank" className="rent-btn">
              Alquilar
            </a>
          </div>
        )}
      </div>

      <h2 className="tech-title">Ficha técnica</h2>

      <div className="features-grid">
        {blocks.map((b, i) => (
          <div key={i} className="feature-card">
            <img src={`${base}${b.url}`} alt="" className="feature-img" />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <div className="gallery-grid">
          {images.slice(1).map((img) => (
            <img
              key={img.id}
              src={`${base}${img.url}`}
              alt=""
              className="gallery-img"
            />
          ))}
        </div>
      )}
    </div>
  );
}
