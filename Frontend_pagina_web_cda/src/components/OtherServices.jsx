"use client";

import { useEffect, useRef, useState } from "react";
import "./otherServices.css";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const WHATSAPP_NUMBER = "573158246718";

export default function OtherServices() {
  const [services, setServices] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(
          `${STRAPI_URL}/api/other-services?populate=images`
        );
        const data = await res.json();
        setServices(data.data || []);
      } catch (error) {
        console.error("Error cargando servicios:", error);
      }
    };

    fetchServices();
  }, []);

  const getWhatsappLink = (title) => {
    const message = `Hola quiero hacer una cotización del servicio adicional ${title}.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const scroll = (direction) => {
    if (!carouselRef.current) return;

    const card = carouselRef.current.querySelector(".serviceCard");
    if (!card) return;

    const scrollAmount = card.offsetWidth + 20;

    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="otherServices">
      <header className="otherServicesHeader">
        <h2 className="otherServicesTitle">Servicios adicionales</h2>
      </header>

      <div className="carouselWrapper">
        <div className="carousel" ref={carouselRef}>
          {services.map((service) => {
            const image =
              service.images?.formats?.large?.url ||
              service.images?.url ||
              "/images/placeholder.jpg";

            return (
              <article
                key={service.id}
                className="serviceCard"
                style={{
                  backgroundImage: `url(${STRAPI_URL}${image})`,
                }}
              >
                <span className="shine" />
                <div className="serviceOverlay" />

                <div className="serviceContent">
                  <h3>{service.title}</h3>
                  <p>{service.textDescripion}</p>

                  <a
                    href={getWhatsappLink(service.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="serviceButton"
                  >
                    Cotizar por WhatsApp
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <div className="carouselControls">
          <button onClick={() => scroll("left")} aria-label="Anterior">
            ‹
          </button>
          <button onClick={() => scroll("right")} aria-label="Siguiente">
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
