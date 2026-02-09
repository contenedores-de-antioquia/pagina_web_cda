"use client";

import { use } from "react";
import ProductsList from "@/components/ProductsList";
import Breadcrumb from "@/components/Breadcrumb";
import CategoryContainerMenu from "@/components/CategoryConteiner";
import { useLanguage } from "@/context/LanguageContext";

export default function SubCategoryPage({ params }) {
  const p = use(params);
  const { category, subcategory } = p;

  const { language } = useLanguage();

  // 🔹 Normaliza slug → texto
  const normalizedTitle = subcategory.replace(/-/g, " ");

  // 🔹 Traducción simple (NO rompe nada)
  const title =
    language === "en"
      ? translateSubcategory(normalizedTitle)
      : normalizedTitle;

  return (
    <div>
      {/* MENÚ DE SUBCATEGORÍAS (NO TOCADO) */}
      <CategoryContainerMenu category={category} />
      <Breadcrumb />
      {/* TÍTULO ÚNICO (YA NO SE DUPLICA) */}
      <h1
        style={{
          textTransform: "capitalize",
          marginTop: "15px",
          marginLeft: "200px",
          marginBottom: "10px",
          fontSize: "25px",
          fontWeight: "600",
        }}
      >
        
        {title}
      </h1>
      
      <ProductsList
        categorySlug={category}
        subCategorySlug={subcategory}
      />
    </div>
  );
}

/* 🔹 Traducciones mínimas (puedes crecerlas luego) */
function translateSubcategory(text) {
  const map = {
    "contenedor de 10 pies": "10 foot container",
    "contenedor de 20 pies": "20 foot container",
    "contenedor de 40 pies": "40 foot container",
    bodegas: "warehouses",
    oficinas: "offices",
  };

  return map[text.toLowerCase()] || text;
}
