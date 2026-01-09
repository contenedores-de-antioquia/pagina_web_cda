"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import "./navbar.css";

export default function Navbar() {
  const { language, setLanguage } = useLanguage();
  const router = useRouter();

  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const t = {
    es: {
      home: "Inicio",
      designs: "Diseños estándar",
      projects: "Proyectos",
      furniture: "Mobiliario",
      blog: "Blog",
      workWithUs: "Trabaja con nosotros",
      ctaTitle: "Asesoría gratis",
      ctaSubtitle: "El contenedor perfecto para tu proyecto",
      search: "Buscar...",
    },
    en: {
      home: "Home",
      designs: "Standard designs",
      projects: "Projects",
      furniture: "Furniture",
      blog: "Blog",
      workWithUs: "Work with us",
      ctaTitle: "Free consultation",
      ctaSubtitle: "The perfect container for your project",
      search: "Search...",
    },
  }[language];

  const menuLinks = useMemo(
    () => [
      { href: "/", label: t.home },
      { href: "/categories/bodegas/contenedor-de-10-pies", label: t.designs },
      { href: "/categories/proyectos", label: t.projects },
      { href: "/categories/mobiliario", label: t.furniture },
      { href: "/blog", label: t.blog },
      { href: "/workWithUs", label: t.workWithUs },
    ],
    [t]
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (!query.trim()) return;
      setSearchOpen(false);
      setMenuOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    },
    [query, router]
  );

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbarTop">

        <div className="leftGroup">
          <Link href="/" aria-label={t.home}>
            <Image
              src="/img/Versión-horizontal-Contenedores-de-Antioquia.png"
              alt="Contenedores de Antioquia"
              width={180}
              height={80}
              className="logoDesktop"
              priority
            />
          </Link>
        </div>

        <nav className={`navMenu ${menuOpen ? "active" : ""}`}>
          <ul>
            {menuLinks.map((item) => (
              <li key={item.label}>
                <Link href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className="searchIcon"
          onClick={() => {
            setSearchOpen((prev) => !prev);
            setMenuOpen(false);
          }}
          aria-label="Buscar"
        >
          <Image src="/img/Lupa-Blanca.png" alt="Buscar" width={18} height={20} />
        </button>

        {/* CTA */}
        <a
          href="https://wa.me/573158246718?text=Hola,%20quiero%20una%20asesoría%20gratuita"
          target="_blank"
          rel="noopener noreferrer"
          className="mensajeCta"
        >
          <h4 className="asesoriaGratuita">{t.ctaTitle}</h4>
          <h5 className="textCta">{t.ctaSubtitle}</h5>
        </a>

        <select
          className="languageSelectNavbar"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="es">ES</option>
          <option value="en">EN</option>
        </select>

        <button
          className="menuToggle"
          onClick={() => {
            setMenuOpen((prev) => !prev);
            setSearchOpen(false);
          }}
          aria-label="Menú"
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {searchOpen && (
        <form className="searchBarExpanded" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder={t.search}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button type="submit">Buscar</button>
        </form>
      )}
    </header>
  );
}
