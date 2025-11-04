"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import "./navbar.css";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("es");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      console.log("Buscando:", query);
    }
  };

  return (
    <header className="navbar">
      {/* === Acciones (idioma arriba a la derecha) === */}
      <div className="navbarActions">
        <select
          className="languageSelect"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
      </div>

      {/* === Sección superior === */}
      <div className="navbarTop">
        {/* Logo */}
        <Image
          src="/img/Versión-vertical-Contenedores-de-Antioquia.png"
          alt="Logo Contenedores de Antioquia"
          width={100}
          height={60}
          priority
        />

        {/* Barra de búsqueda */}
        <form className="searchBar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Busca contenedores, servicio logístico, mobiliario y más..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">🔍</button>
        </form>

        {/* Botón hamburguesa */}
        <button className="menuToggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✖" : "☰"}
        </button>

        {/* Mensaje de CTA */}
        <a
          href="https://wa.me/573158246718?text=Hola!%20Quiero%20más%20información%20sobre%20contenedores."
          target="_blank"
          rel="noopener noreferrer"
          className="mensajeCta block cursor-pointer no-underline text-inherit"
        >
          <h4 className="asesoriaGratuita">Asesoría gratis</h4>
          <h5 className="textCta">El contenedor perfecto para tu proyecto</h5>
        </a>
      </div>

      {/* === Menú desplegable === */}
      <nav className={`navMenu ${menuOpen ? "active" : ""}`}>
        <ul>
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>
            <Link href="/containers/categories/bodegas">
              Contenedores diseños estándar
            </Link>
          </li>
          <li>
            <Link href="/proyects">Contenedores proyectos</Link>
          </li>
          <li>
            <Link href="/mobiliario/puesto-de-trabajo">Mobiliario</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
