"use client";

import { useEffect, useState, use } from "react";
import { useLanguage } from "@/context/LanguageContext";
import "./furniture.css";

export default function FurniturePage({ params }) {
  const { slug } = use(params);
  const { language } = useLanguage();

  const [item, setItem] = useState(null);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/furnitures?filters[slug][$eq]=${slug}&populate=*&locale=${language}`,
        { cache: "no-store" }
      );

      const json = await res.json();
      const entry = json?.data?.[0];
      if (!entry) return setItem(null);

      const data = entry;

      const images =
        data.images?.map(
          (img) => `${process.env.NEXT_PUBLIC_STRAPI_URL}${img.url}`
        ) || [];

      const getMaterialUrl = (m) =>
        m ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${m.url}` : null;

      setItem({
        id: data.id,
        name: data.fornitureName,
        slug: data.slug,
        rent: data.rent,
        saleValue: data.saleValue,
        description: data.description,
        height: data.height,
        width: data.width,
        long: data.long,
        categories: data.categories || [],
        images,
        materials: {
          material01: getMaterialUrl(data.material01),
          material02: getMaterialUrl(data.material02),
          material03: getMaterialUrl(data.material03),
          material04: Array.isArray(data.material04)
            ? data.material04.map((m) => getMaterialUrl(m))
            : [],
        },
      });
    }

    fetchData();
  }, [slug, language]);

  const t = {
    es: {
      notFound: "Mobiliario no encontrado",
      quote: "Cotiza servicio logístico",
      sale: "Venta",
      iva: "IVA incluido",
      buy: "Comprar",
      rentAvailable: "Cotizar alquiler",
      materials: "Materiales",
      height: "Alto",
      width: "Ancho",
      long: "Largo",
    },
    en: {
      notFound: "Furniture not found",
      quote: "Request logistics quote",
      sale: "Sale",
      iva: "VAT included",
      buy: "Buy",
      rentAvailable: "Request rental quote",
      materials: "Materials",
      height: "Height",
      width: "Width",
      long: "Length",
    },
  };

  if (!item) return <h1 style={{ padding: 40 }}>{t[language].notFound}</h1>;

  const productUrl = `https://contenedoresmodulares.com/categories/mobiliario/${item.slug}`;

  const buyMsg =
    `Hola, quiero comprar el siguiente mobiliario:\n\n` +
    `📦 *${item.name}*\n` +
    `💲 Precio: $${item.saleValue.toLocaleString()}\n` +
    `🔗 Link: ${productUrl}`;

  const buyUrl =
    `https://wa.me/573158246718?text=${encodeURIComponent(buyMsg)}`;

  const rentMsg =
    `Hola, quiero cotizar el alquiler del siguiente mobiliario:\n\n` +
    `📦 *${item.name}*\n` +
    `🔗 Link: ${productUrl}`;

  const rentUrl =
    `https://wa.me/573158246718?text=${encodeURIComponent(rentMsg)}`;

  //  🔥 actualización para servicio logístico
  const logisticsMsg =
    `Hola quiero cotizar el costo del servicio logistico para la compra del mobiliario ${item.name}`;

  const logisticsUrl =
    `https://wa.me/573158246718?text=${encodeURIComponent(logisticsMsg)}`;

  return (
    <div className="furniture-container">

      <h1 className="title">{item.name}</h1>

      <div className="carousel-container">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${slide * 100}%)` }}
        >
          {item.images.map((img, i) => (
            <div key={i} className="carousel-slide">
              <img src={img} alt={item.name} />
            </div>
          ))}
        </div>

        <div className="carousel-dots">
          {item.images.map((_, i) => (
            <div
              key={i}
              className={`carousel-dot ${slide === i ? "active" : ""}`}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>
      </div>

      <div className="purchase-box">

        {item.rent === "Disponible para alquiler" ? (
          <a href={rentUrl} target="_blank" className="rent-button">
            {t[language].rentAvailable}
          </a>
        ) : (
          <p className="rent-unavailable">{item.rent}</p>
        )}

        <div className="price-row">
          <div className="price-info">
            <p className="price-label">{t[language].sale}</p>
            <p className="price-value">
              ${item.saleValue.toLocaleString()}
            </p>
            <span className="iva">{t[language].iva}</span>
          </div>

          <a href={buyUrl} target="_blank" className="buy-button">
            {t[language].buy}
          </a>
        </div>

        {/* 🔥 botón logístico actualizado sin mover nada más */}
        <a href={logisticsUrl} target="_blank" className="purchase-title">
          {t[language].quote}
        </a>

        <p className="description-text">{item.description}</p>
      </div>

      <div className="measurements-box">
        <div className="measure-item">
          <h4>{t[language].height}</h4>
          <p>{item.height} m</p>
        </div>

        <div className="measure-item">
          <h4>{t[language].long}</h4>
          <p>{item.long} m</p>
        </div>

        <div className="measure-item">
          <h4>{t[language].width}</h4>
          <p>{item.width} m</p>
        </div>
      </div>

      <h2 className="subtitle">{t[language].materials}</h2>

      <div className="materials">
        {item.materials.material01 && (
          <img src={item.materials.material01} className="material-img" />
        )}

        {item.materials.material02 && (
          <img src={item.materials.material02} className="material-img" />
        )}

        {item.materials.material03 && (
          <img src={item.materials.material03} className="material-img" />
        )}

        {item.materials.material04.map((m, i) => (
          <img key={i} src={m} className="material-img" />
        ))}
      </div>
    </div>
  );
}
