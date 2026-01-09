"use client";

import { useEffect, useState, use } from "react";
import { useLanguage } from "@/context/LanguageContext";
import "./product.css";

/* 🔹 FORMATO PESOS COLOMBIANOS */
const formatCOP = (value) => {
  if (!value) return null;

  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(value);
};

export default function ProductPage({ params }) {
  const resolvedParams = use(params);
  const { language } = useLanguage();

  const category = resolvedParams?.category || "";
  const subcategory = resolvedParams?.subcategory || "";
  const slug = resolvedParams?.slug || "";

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) =>
      prev + 1 < (product?.images?.length || 0) ? prev + 1 : 0
    );
  };

  const prev = () => {
    setCurrentIndex((prev) =>
      prev - 1 >= 0 ? prev - 1 : (product?.images?.length || 1) - 1
    );
  };

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(
          `http://localhost:1337/api/products?filters[slug][$eq]=${slug}&populate=*&locale=${language}`
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
  }, [slug, language]);

  if (loading) return <p>{language === "en" ? "Loading..." : "Cargando..."}</p>;
  if (!product)
    return (
      <p>
        {language === "en"
          ? "Product not found."
          : "Producto no encontrado."}
      </p>
    );

  const base = "http://localhost:1337";

  const title = product.productName;
  const description = product.description;

  const images = product.images || [];
  const saleValue = product.saleValue;
  const rentalValue = product.rentalValue;

  const whatsappBuy = `https://wa.me/573158246718?text=${
    language === "en"
      ? "Hello, I want to quote the purchase of"
      : "Hola, quiero cotizar la compra de"
  } ${encodeURIComponent(title)}`;

  const whatsappRent = `https://wa.me/573158246718?text=${
    language === "en"
      ? "Hello, I want to quote the rental of"
      : "Hola, quiero cotizar el alquiler de"
  } ${encodeURIComponent(title)}`;

  return (
    <div className="product-page">
      {images.length > 0 && (
        <div className="carousel">
          <h1 className="product-title">{title}</h1>

          <div className="carousel-inner">
            <button className="carousel-btn left" onClick={prev}>
              ‹
            </button>

            <img
              src={`${base}${images[currentIndex].url}`}
              className="carousel-img"
              alt="producto"
            />

            <button className="carousel-btn right" onClick={next}>
              ›
            </button>
          </div>

          <div className="carousel-dots">
            {images.map((_, i) => (
              <span
                key={i}
                className={`dot ${i === currentIndex ? "active" : ""}`}
                onClick={() => setCurrentIndex(i)}
              />
            ))}
          </div>
        </div>
      )}

      <p className="product-subtitle">{description}</p>

      <div className="price-section">
        {saleValue && (
          <div className="price-box">
            <p className="price-label">
              {language === "en" ? "Sale" : "Venta"}
            </p>
            <p className="price-value">{formatCOP(saleValue)}</p>
            <p className="price-note">
              {language === "en" ? "VAT included" : "IVA incluido"}
            </p>
          </div>
        )}

        <div className="price-box-button">
          <a href={whatsappBuy} target="_blank" className="buy-btn">
            {language === "en" ? "Buy" : "Comprar"}
          </a>
        </div>

        {rentalValue && (
          <div className="price-box">
            <p className="price-label">
              {language === "en" ? "Rent" : "Alquiler"}
            </p>
            <p className="price-value">{formatCOP(rentalValue)}</p>
            <p className="price-note">
              {language === "en" ? "VAT included" : "IVA incluido"}
            </p>
          </div>
        )}

        <div className="price-box-button">
          <a href={whatsappRent} target="_blank" className="rent-btn">
            {language === "en" ? "Rent" : "Alquilar"}
          </a>
        </div>
      </div>

      <h2 className="tech-title">
        {language === "en" ? "Technical sheet" : "Ficha técnica"}
      </h2>

      <div className="features-block block-1">
        {product.imageMeasurements && (
          <div className="feature-card-first">
            <img
              src={`${base}${product.imageMeasurements.url}`}
              className="feature-img"
            />
          </div>
        )}

        {product.typeOfCoating && (
          <div className="feature-card-first">
            <img
              src={`${base}${product.typeOfCoating.url}`}
              className="feature-img"
            />
          </div>
        )}
      </div>

      <div className="features-block block-2">
        {product.typeOfFloor && (
          <div className="feature-card">
            <img
              src={`${base}${product.typeOfFloor.url}`}
              className="feature-img"
            />
          </div>
        )}

        {product.typeOfFinish && (
          <div className="feature-card">
            <img
              src={`${base}${product.typeOfFinish.url}`}
              className="feature-img"
            />
          </div>
        )}

        {product.numberOfWindows && (
          <div className="feature-card">
            <img
              src={`${base}${product.numberOfWindows.url}`}
              className="feature-img"
            />
          </div>
        )}

        {product.doors && (
          <div className="feature-card">
            <img src={`${base}${product.doors.url}`} className="feature-img" />
          </div>
        )}
      </div>

      <div className="features-block block-3">
        {product.electricalNetwork && (
          <div className="feature-card">
            <img
              src={`${base}${product.electricalNetwork.url}`}
              className="feature-img"
            />
          </div>
        )}

        {product.voiceAndData && (
          <div className="feature-card">
            <img
              src={`${base}${product.voiceAndData.url}`}
              className="feature-img"
            />
          </div>
        )}

        {/* ✅ POWER OUTLETS */}
        {product.powerOutlets && (
          <div className="feature-card">
            <img
              src={`${base}${product.powerOutlets.url}`}
              className="feature-img"
              alt="power outlets"
            />
          </div>
        )}

        {product.outlet && (
          <div className="feature-card">
            <img src={`${base}${product.outlet.url}`} className="feature-img" />
          </div>
        )}

        {product.lightning && (
          <div className="feature-card">
            <img
              src={`${base}${product.lightning.url}`}
              className="feature-img"
            />
          </div>
        )}

        {product.switch && (
          <div className="feature-card">
            <img src={`${base}${product.switch.url}`} className="feature-img" />
          </div>
        )}

        {product.airConditioning && (
          <div className="feature-card">
            <img
              src={`${base}${product.airConditioning.url}`}
              className="feature-img"
            />
          </div>
        )}
      </div>
    </div>
  );
}
