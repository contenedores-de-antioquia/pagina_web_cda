"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import "./categoryContainer.css";

// 🔥 CONSTANTES FUERA DEL COMPONENTE (evita recrearlas)
const API_URL =
  "http://localhost:1337/api/container-categories?populate=*";

// 🔥 ORDEN PRECALCULADO
const ORDER = ["10 pies", "20 pies", "40 pies"];

export default function CategoryContainerMenu({ category }) {
  const [subcats, setSubcats] = useState([]);

  // Normalizamos la categoría una sola vez
  const categoryLabel = useMemo(
    () => (category ? category.toUpperCase() : ""),
    [category]
  );

  // Carga optimizada
  useEffect(() => {
    const controller = new AbortController();

    const fetchCats = async () => {
      try {
        const res = await fetch(API_URL, {
          next: { revalidate: 60 },
          cache: "force-cache", // ⚡ Carga más rápida
          signal: controller.signal,
        });

        // ⚡ Evitamos bloquear si responde vacío
        const json = await res.json().catch(() => ({ data: [] }));

        setSubcats(json.data || []);
      } catch (e) {
        if (e.name !== "AbortError") {
          console.error("Error cargando container-categories:", e);
        }
      }
    };

    fetchCats();

    // Cancelación del fetch si el usuario sale
    return () => controller.abort();
  }, []);

  // Ordenación optimizada con useMemo
  const orderedSubcats = useMemo(() => {
    if (!subcats.length) return subcats;

    return subcats.slice().sort((a, b) => {
      const aName = a?.nameCategoryContainers?.toLowerCase() || "";
      const bName = b?.nameCategoryContainers?.toLowerCase() || "";

      const aIndex = ORDER.findIndex((o) => aName.includes(o));
      const bIndex = ORDER.findIndex((o) => bName.includes(o));

      return aIndex - bIndex;
    });
  }, [subcats]);

  return (
    <div className="category-wrapper">
      <h2 className="page-title">{categoryLabel}</h2>

      <div className="category-menu">
        {orderedSubcats.map((sub, i) => {
          const img = sub?.imgContainerCategory?.url
            ? `http://localhost:1337${sub.imgContainerCategory.url}`
            : "/placeholder.png";

          return (
            <Link
              key={sub.id}
              href={`/categories/${category}/${sub.slug}`}
              className="category-card"
            >
              <img
                src={img}
                alt={sub.nameCategoryContainers}
                className={`img size-${i + 1}`}
                loading="lazy"
              />
              <p className={`text size-${i + 1}`}>
                {sub.nameCategoryContainers}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
