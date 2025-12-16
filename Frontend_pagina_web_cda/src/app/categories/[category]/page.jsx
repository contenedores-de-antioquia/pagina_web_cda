"use client";

import React, { use } from "react";
import CategoryContainers from "@/components/CategoryConteiner";
import ProductsList from "@/components/ProductsList";

export default function CategoryPage({ params }) {
  // ⬇️ params AHORA ES UNA PROMESA → DEBE IR ENVUELTO CON use()
  const p = use(params);
  const { category } = p;

  // Categorías que NO deben mostrar contenedores
  const hiddenCategories = ["proyectos", "mobiliario"];

  const showCategoryContainers = !hiddenCategories.includes(category);

  return (
    <div style={{ padding: 10 }}>
      {/* Mostrar subcategorías SOLO en bodegas / oficinas / container categories */}
      {showCategoryContainers && (
        <CategoryContainers 
          category={category}
          slug={category}
        />
      )}

      {/* Mostrar productos bajo la categoría principal */}
      <ProductsList 
        categorySlug={category}
      />
    </div>
  );
}
