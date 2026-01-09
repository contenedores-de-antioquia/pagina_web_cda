"use client";

import { use } from "react";
import ProductsList from "@/components/ProductsList";
import Breadcrumb from "@/components/Breadcrumb";
import CategoryContainerMenu from "@/components/CategoryConteiner";
import { useLanguage } from "@/context/LanguageContext";


export default function CategoryPage({ params }) {
  const p = use(params);
  const { category } = p;

  const { language } = useLanguage();

  // 🔹 Normaliza slug → texto
  const normalizedTitle = category.replace(/-/g, " ");

  // 🔹 Traducción básica
  const title =
    language === "en"
      ? translateCategory(normalizedTitle)
      : normalizedTitle;

  return (
    <div>
      {/* MENÚ DE CATEGORÍA (NO TOCADO) */}
      <CategoryContainerMenu category={category} />
      <Breadcrumb />
      
      <ProductsList categorySlug={category} />
    </div>
  );
}

/* 🔹 Traducciones mínimas */
function translateCategory(text) {
  const map = {
    bodegas: "warehouses",
    proyectos: "projects",
    mobiliario: "furniture",
  };

  return map[text.toLowerCase()] || text;
}
