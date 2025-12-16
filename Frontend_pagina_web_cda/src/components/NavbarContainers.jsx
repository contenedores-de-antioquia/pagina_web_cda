"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import "./navbarcontainers.css";

export default function NavbarContainers() {
  
  const baseUrl = useMemo(
    () => process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337",
    []
  );

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch(
        `${baseUrl}/api/categories?populate=mainImage`,
        {
          next: { revalidate: 60 },
        }
      );

      if (!res.ok) throw new Error("Error al cargar categorías");

      const data = await res.json();

      if (!data?.data) {
        console.error("Estructura inesperada:", data);
        return;
      }

      setCategories(data.data);

    } catch (error) {
      console.error("Error cargando categorías:", error);
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // ✅ useMemo SIEMPRE antes de cualquier return
  const processedCategories = useMemo(() => {
    return categories.map((cat) => {
      const nombre = cat.categoryName || "Sin nombre";
      const slug = cat.slug || nombre.toLowerCase().replace(/\s+/g, "-");

      const img =
        cat.mainImage?.formats?.medium?.url ??
        cat.mainImage?.url ??
        "/img/diseño-banner-página.png";

      return {
        id: cat.id,
        nombre,
        slug,
        imagen: `${baseUrl}${img}`,
      };
    });
  }, [categories, baseUrl]);

  // ✅ Ahora los returns condicionales VAN DESPUÉS de los hooks
  if (loading)
    return (
      <p className="NavbarContainers-loading">
        Cargando categorías...
      </p>
    );

  if (!categories.length)
    return (
      <p className="NavbarContainers-empty">
        No hay categorías disponibles.
      </p>
    );

  return (
    <nav className="NavbarContainers">
      <ul className="CircleNavbar">
        {processedCategories.map((cat) => (
          <li key={cat.id} className="CircleNavbar-item">
            <Link href={`/categories/${cat.slug}`} className="CircleNavbar-link">
              <div className="CircleNavbar-img-container">
                <img
                  className="NavbarContainers-img"
                  src={cat.imagen}
                  alt={cat.nombre}
                  loading="lazy"
                />
              </div>
              <span className="CircleNavbar-text">{cat.nombre}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

