"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import "./categoryContainer.css";

const API_URL = "http://localhost:1337/api/container-categories?populate=*";

// Orden fijo
const ORDER = ["10 pies", "20 pies", "40 pies"];

// Categorías que NO deben mostrar subcategorías
const BLOCK_SUBCATEGORIES = ["proyectos", "mobiliario"];

export default function CategoryContainerMenu({ category }) {
  const [subcats, setSubcats] = useState([]);

  // Convertir categoría a mayúscula
  const categoryLabel = useMemo(() => category?.toUpperCase(), [category]);

  // Saber si esta categoría puede mostrar subcategorías
  const showSubcategories = !BLOCK_SUBCATEGORIES.includes(category);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCats = async () => {
      try {
        const res = await fetch(API_URL, {
          next: { revalidate: 60 },
          cache: "force-cache",
          signal: controller.signal,
        });

        const json = await res.json().catch(() => ({ data: [] }));
        setSubcats(json.data || []);
      } catch (e) {
        if (e.name !== "AbortError") console.error(e);
      }
    };

    fetchCats();
    return () => controller.abort();
  }, []);

  // Ordenar por 10, 20, 40 pies
  const orderedSubcats = useMemo(() => {
    if (!subcats.length) return [];

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

      {/* ⭐ TÍTULO SIEMPRE */}
      <h2 className="page-title">{categoryLabel}</h2>

      {/* ⭐ SUBCATEGORÍAS SOLO SI ESTA CATEGORÍA LO PERMITE */}
      {showSubcategories && (
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
      )}

    </div>
  );
}
