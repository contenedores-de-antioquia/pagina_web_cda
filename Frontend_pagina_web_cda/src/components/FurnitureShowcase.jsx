"use client";

import React, { useEffect, useRef, useState } from "react";
import "./furnitureShowcase.css";
import { useRouter } from "next/navigation";

const FornitureShowcase = () => {
  const [items, setItems] = useState([]);
  const sliderRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:1337/api/furnitures?populate=*");
        const json = await res.json();

        if (!json.data) return;

        const onlyActive = json.data.filter((item) => item.active === true);

        const mapped = onlyActive.map((item) => {
          const imgData = item.images?.[0];

          const img =
            imgData?.url
              ? `http://localhost:1337${imgData.url}`
              : imgData?.formats?.small?.url
              ? `http://localhost:1337${imgData.formats.small.url}`
              : null;

          return {
            id: item.id,
            name: item.fornitureName,
            slug: item.slug,
            price: item.saleValue,
            rent: item.rent,
            image: img,
          };
        });

        setItems(mapped);
      } catch (err) {
        console.log("❌ Error cargando mobiliario:", err);
      }
    };

    fetchData();
  }, []);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 400, behavior: "smooth" });
  };

  return (
    <div className="forniture-wrapper">

      <h2 className="forniture-title">Mobiliario</h2>

      <p className="forniture-subtitle">
        Diseños funcionales, resistentes y hechos con ingeniería inteligente.
      </p>

      {/* 🔥 SLIDER */}
      <div className="forniture-slider-container">
        <div className="forniture-slider" ref={sliderRef}>
          
          {items.map((i) => (
            <div key={i.id} className="forniture-slide-card">
              
              <div
                className="forniture-slide-img"
                style={{ backgroundImage: `url(${i.image})` }}
              />

              <div className="forniture-slide-info">
                <h3>{i.name}</h3>

                <p className="forniture-price">
                  ${i.price?.toLocaleString("es-CO")}
                </p>

                <span className="forniture-rent">
                  {i.rent || "No disponible para alquiler"}
                </span>

                {/* 🔥 BOTÓN CORRECTO CON LA RUTA BIEN */}
                <button
                  className="forniture-view-btn"
                  onClick={() => router.push(`/furniture/${i.slug}`)}
                >
                  Más información
                </button>
              </div>

            </div>
          ))}

        </div>

        {/* 🔥 FLECHAS */}
        <div className="forniture-top-arrows">
          <button className="forniture-main-arrow" onClick={scrollLeft}>‹</button>
          <button className="forniture-main-arrow" onClick={scrollRight}>›</button>
        </div>
      </div>

    </div>
  );
};

export default FornitureShowcase;
