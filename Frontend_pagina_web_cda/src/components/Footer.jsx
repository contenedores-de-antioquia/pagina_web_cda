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
          {categoriesRight.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="footer-link"
            >
              {cat.name}
            </Link>
          ))}

          <a
            href="https://www.bcorporation.net/en-us/find-a-b-corp/company/contenedores-de-antioquia/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Empresa B
          </a>
        </div>

        {/* --- COLUMNA 3 --- */}
        <div className="footer-column">
          <h4>Visítanos</h4>
          <p className="direction">
            Oficina principal / Planta de producción.<br />
            Dirección: Km 1 entrada a Girardota,<br />
            Antioquia. (Colombia)
          </p>

          <Link
            className="location"
            href="https://www.google.com/maps/place/Contenedores+de+Antioquia"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver ubicación en Google Maps
          </Link>

          <h4>Escríbenos</h4>

          <a
            className="email footer-link"
            href="mailto:comercial@contenedoresdeantioquia.com"
          >
            comercial@contenedoresdeantioquia.com
          </a>

          <p className="policy">Política Tratamiento de Datos</p>
          <p className="policy">Política Sistema de Gestión Integral</p>
        </div>

        {/* --- COLUMNA 4 (EMPRESA B + REDES) --- */}
        <div className="footer-column footer-bcorp">
          <a
            href="https://www.bcorporation.net/en-us/find-a-b-corp/company/contenedores-de-antioquia/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/img/Logo-Empresa-B-01.png"
              alt="Empresa B"
              loading="lazy"
            />
          </a>

          <div className="footer-socials">
            <a href="https://www.instagram.com/contenedores_ant/" target="_blank">
              <img src="/img/Instagram-Contenedores-de-Antioquia.png" alt="Instagram" />
            </a>

            <a href="https://linkedin.com/company/contenedoresdeantioquia?originalSubdomain=co" target="_blank">
              <img src="/img/Linkedin-Contenedores-de-Antioquia.png" alt="LinkedIn" />
            </a>

            <a href="https://www.facebook.com/ContenedoresdeAntioquia/?locale=es_LA" target="_blank">
              <img src="/img/Facebook-Contenedores-de-Antioquia.png" alt="Facebook" />
            </a>

            <a href="https://www.youtube.com/channel/UCIIrJuxjUPfITWhT8HzrZjA" target="_blank">
              <img src="/img/Youtube-Contenedores-de-Antioquia.png" alt="YouTube" />
            </a>

            <a
              href="https://wa.me/573158246718?text=Hola,%20quiero%20una%20asesor%C3%ADa%20gratuita."
              target="_blank"
            >
              <img src="/img/Whatsapp-Contenedores-de-Antioquia.png" alt="WhatsApp" />
            </a>
          </div>
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
        © 2026 Contenedores de Antioquia. Todos los derechos reservados.
      </div>

    </footer>
  );
}
