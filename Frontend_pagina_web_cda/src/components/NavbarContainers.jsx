"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./navbarcontainers.css";

export default function NavbarContainers() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/categories?populate=mainImage`);
        const data = await res.json();
        if (data && data.data) {
          setCategories(data.data);
        } else {
          console.error("No se recibieron categorías válidas", data);
        }
      } catch (error) {
        console.error("Error cargando categorías:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [baseUrl]);

  if (loading) return <p className="NavbarContainers-loading">Cargando categorías...</p>;
  if (!categories.length) return <p className="NavbarContainers-empty">No hay categorías disponibles.</p>;

  return (
    <nav className="NavbarContainers">
      <ul className="CircleNavbar">
        {categories.map((cat) => {
          const nombre = cat.categoryName || "Sin nombre";
          const slug = cat.slug || nombre.toLowerCase().replace(/\s+/g, "-");
          const imagenUrl =
            cat.mainImage?.formats?.medium?.url ||
            cat.mainImage?.url ||
            "/img/diseño-banner-página.png";

          return (
            <li key={cat.id} className="CircleNavbar-item">
              {/* 🔥 Ruta actualizada */}
              <Link href={`/categories/${slug}`} className="CircleNavbar-link">
                <div className="CircleNavbar-img-container">
                  <img
                    className="NavbarContainers-img"
                    src={`${baseUrl}${imagenUrl}`}
                    alt={nombre}
                  />
                </div>
                <span className="CircleNavbar-text">{nombre}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
