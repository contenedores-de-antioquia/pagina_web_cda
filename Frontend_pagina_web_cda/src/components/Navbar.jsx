"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback, useMemo } from "react";
import "./navbar.css";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("es");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ⚡ Menú memorizado para no recrearlo en cada render
  const menuLinks = useMemo(
    () => [
      { href: "/", label: "Inicio" },
      { href: "/containers/categories/bodegas", label: "Diseños estándar" },
      { href: "/proyects", label: "Proyectos" },
      { href: "/mobiliario/puesto-de-trabajo", label: "Mobiliario" },
      { href: "/blog", label: "Blog" },
    ],
    []
  );

  // ⚡ Scroll optimizado
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ⚡ Callbacks memorizados
  const toggleSearch = useCallback(() => {
    setSearchOpen((prev) => !prev);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (query.trim()) console.log("Buscando:", query);
    },
    [query]
  );

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbarTop">

        {/* LOGO (optimizado con priority solo en desktop) */}
        <div className="leftGroup">
          <Image
            src="/img/Versión-horizontal-Contenedores-de-Antioquia.png"
            alt="Logo Contenedores de Antioquia"
            width={180}
            height={80}
            className="logoDesktop"
            priority
          />
          <Image
            src="/img/Versión-vertical-Contenedores-de-Antioquia.png"
            alt="Logo Contenedores de Antioquia"
            width={70}
            height={70}
            className="logoMobile"
          />
        </div>

        {/* MENÚ */}
        <nav className={`navMenu ${menuOpen ? "active" : ""}`}>
          <ul>
            {menuLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* LUPA */}
        <button className="searchIcon" onClick={toggleSearch}>
          <Image
            src="/img/Lupa-Blanca.png"
            alt="Buscar"
            width={18}
            height={20}
          />
        </button>

        {/* CTA */}
        <a
          href="https://wa.me/573158246718?text=Hola!%20Quiero%20más%20información."
          target="_blank"
          rel="noopener noreferrer"
          className="mensajeCta no-underline text-inherit"
        >
          <h4 className="asesoriaGratuita">Asesoría gratis</h4>
          <h5 className="textCta">El contenedor perfecto para tu proyecto</h5>
        </a>

        {/* IDIOMA */}
        <select
          className="languageSelectNavbar"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="es">ES</option>
          <option value="en">EN</option>
        </select>

        {/* HAMBURGUESA */}
        <button className="menuToggle" onClick={toggleMenu}>
          {menuOpen ? "✖" : "☰"}
        </button>

      </div>

      {/* BUSCADOR */}
      {searchOpen && (
        <form className="searchBarExpanded" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Buscar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
      )}

    </header>
  );
}
