"use client";

import { useEffect, useState, useMemo } from "react";
import "./clientLogosCarousel.css";

const ClientLogosCarousel = () => {
  const [logos, setLogos] = useState([]);

  // 🚀 Fetch optimizado
  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const res = await fetch(
          "http://localhost:1337/api/client-logos?populate=*",
          { next: { revalidate: 120 } } // ⬅️ Cache 2 min
        );

        const json = await res.json();
        if (!json.data) return;

        const mapped = json.data
          .map((item) => {
            const img = item?.imageClientlogo?.[0]?.url;

            if (!img) return null;

            return {
              id: item.id,
              url: img.startsWith("http")
                ? img
                : `http://localhost:1337${img}`,
              name: item.clientName || "",
            };
          })
          .filter(Boolean);

        setLogos(mapped);
      } catch (err) {
        console.log("❌ Error cargando logos", err);
      }
    };

    fetchLogos();
  }, []);

  // 🚀 Duplicación con useMemo → evita cálculos en cada render
  const duplicatedLogos = useMemo(
    () => [...logos, ...logos],
    [logos]
  );

  return (
    <div className="client-logos-wrapper">
      <h2 className="client-logos-title">Nuestros Clientes</h2>

      <div className="logos-slider">
        <div className="logos-track">
          {duplicatedLogos.map((logo, i) => (
            <div key={`${logo.id}-${i}`} className="logo-box">
              <img src={logo.url} alt={logo.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientLogosCarousel;
