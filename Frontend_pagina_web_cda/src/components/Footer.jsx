"use client";

import Link from "next/link";
import { useMemo } from "react";
import "./footer.css";

export default function Footer() {

  const { categoriesLeft, categoriesRight } = useMemo(() => ({
    categoriesLeft: [
      { name: "Bodegas", slug: "bodegas" },
      { name: "Oficinas", slug: "oficinas" },
      { name: "Locales", slug: "locales" },
      { name: "Baños", slug: "banos" },
      { name: "Polvorines", slug: "polvorines" },
      { name: "Habitaciones", slug: "habitaciones" },
    ],
    categoriesRight: [
      { name: "Casas modulares", slug: "casas-modulares" },
      { name: "Proyectos / Mobiliario", slug: "proyectos-mobiliario" },
      { name: "Servicio logístico", slug: "servicio-logistico" },
      { name: "Blog", slug: "blog" },
      { 
        name: "Empresa B", 
        external: true,
        url: "https://www.sistemab.org/"
      },
    ],
  }), []);

  return (
    <footer className="footer">
      <div className="footer-content">

        {/* --- COLUMNA 1 --- */}
        <div className="footer-column">
          {categoriesLeft.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="footer-link"
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* --- COLUMNA 2 --- */}
        <div className="footer-column">
          {categoriesRight.map((cat) =>
            cat.external ? (
              <a
                key={cat.name}
                href={cat.url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                {cat.name}
              </a>
            ) : (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="footer-link"
              >
                {cat.name}
              </Link>
            )
          )}
        </div>

        {/* --- INFORMACIÓN CORPORATIVA --- */}
        <div className="footer-column">
          <h4>Visítanos</h4>
          <p className="direction">
            Oficina principal / Planta de producción.<br />
            Dirección: Km 1 entrada a Girardota,<br />
            Antioquia. (Colombia)
          </p>

          <Link
            className="location"
            href="https://www.google.com/maps/place/Contenedores+de+Antioquia/data=!4m2!3m1!1s0x0:0xc6b961b25831fa72?sa=X&ved=1t:2428&ictx=111"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver ubicación en Google Maps
          </Link>

          <h4>Escríbenos</h4>

          {/* ✅ CORREO ACTIVADO PARA ABRIR APP DE EMAIL */}
          <a 
            className="email footer-link"
            href="mailto:comercial@contenedoresdeantioquia.com"
          >
            Enviar un mail: comercial@contenedoresdeantioquia.com
          </a>
            <div className="policy-liks">
                <p className="policy">Política Tratamiento de Datos</p>
                <p className="policy">Política Sistema de Gestión Integral</p>
            </div>
        </div>

        {/* --- LOGO EMPRESA B (Click lleva al link) --- */}
        <div className="footer-bcorp">
          <a 
            href="https://www.sistemab.org/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <img 
              src="/img/Logo-Empresa-B-01.png" 
              alt="Empresa B"
              loading="lazy"
            />
          </a>
        </div>

      </div>

      {/* --- LOGO PRINCIPAL --- */}
      <div className="footer-logo-section">
        <img
          src="/img/Versión-horizontal-Contenedores-de-Antioquia - negro.png"
          alt="Contenedores de Antioquia Logo"
          className="footer-main-logo"
          loading="lazy"
        />
        <p className="small-note">Somos una empresa Colombiana</p>
      </div>

      {/* --- COPYRIGHT --- */}
      <div className="footer-copy">
        Copyright © 2026 Contenedores de Antioquia.
        Todos los derechos reservados.
      </div>
    </footer>
  );
}
