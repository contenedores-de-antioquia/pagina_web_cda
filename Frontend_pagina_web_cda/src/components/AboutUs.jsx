"use client";

import { useEffect, useRef } from "react";
import "./aboutUs.css";

export default function AboutUs() {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cardRef.current.classList.add("visible");
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="aboutUsSection">
      <div className="aboutUsCard" ref={cardRef}>
        {/* IZQUIERDA */}
        <div className="aboutUsLeft">
          <span className="aboutUsYear">Desde 2007</span>
        </div>

        {/* DERECHA */}
        <div className="aboutUsRight">
          <h2>
            Construimos espacios que <br /> transforman realidades
          </h2>

          <p>
            Desde 2007 en <strong>Contenedores de Antioquia</strong> desarrollamos
            soluciones modulares innovadoras que conectan diseño, ingeniería y
            propósito. Creamos espacios funcionales, sostenibles y hechos para
            durar.
          </p>
        </div>
      </div>
    </section>
  );
}
