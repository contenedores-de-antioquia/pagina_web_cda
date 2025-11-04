"use client";

import { useEffect, useState } from "react";
import "./banners.css";

export default function Banners() {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/banners?populate=*`
        );
        const data = await res.json();

        console.log("data desde Strapi:", data);

        // aquí accedemos directo a data[0].images
        const images =
          data?.data?.[0]?.images?.map(
            (img) => img?.url || img?.formats?.large?.url
          ) || [];

        setBanners(images);
      } catch (error) {
        console.error("Error cargando banners:", error);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners]);

  if (!banners.length) return <p>Cargando banners...</p>;

  return (
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
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${src}`}
            alt={`Banner ${i + 1}`}
            className="bannerImage"
          />
        ))}
      </div>
    </div>
  );
}


