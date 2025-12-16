"use client";

import { useEffect, useState } from "react";
import "./banners.css";

export default function Banners() {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL;

    const fetchBanners = async () => {
      try {
        const res = await fetch(`${STRAPI}/api/banners?populate=*`, {
          cache: "force-cache",
          signal: controller.signal,
        });

        const data = await res.json();

        const images =
          data?.data?.[0]?.images
            ?.map(
              (img) =>
                img?.url ||
                img?.formats?.large?.url ||
                img?.formats?.medium?.url ||
                img?.formats?.small?.url ||
                null
            )
            .filter(Boolean) || [];

        setBanners(images);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error cargando banners:", error);
        }
      }
    };

    fetchBanners();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [banners]);

  if (!banners.length) return <p>Cargando banners...</p>;

  const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL;

  return (
    <div className="bannerContainer">
      <div className="bannerSlider">
        <div
          className="slides"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${banners.length * 100}%`,
          }}
        >
          {banners.map((src, i) => (
            <img
              key={i}
              src={`${STRAPI}${src}`}
              alt={`Banner ${i + 1}`}
              className="bannerImage"
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>

        {/* === Dots === */}
        <div className="dots">
          {banners.map((_, i) => (
            <span
              key={i}
              className={i === currentIndex ? "active" : ""}
              onClick={() => setCurrentIndex(i)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}
