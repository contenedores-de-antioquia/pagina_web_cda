"use client";

import React, { use } from "react";
import ProductsList from "@/components/ProductsList";
import CategoryContainerMenu from "../../../../components/CategoryConteiner";

export default function SubCategoryPage({ params }) {
  // ⬇️ DESENROLLAMOS params (porque ahora es una Promise)
  const p = use(params);
  const { category, subcategory } = p;

  return (

    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: "1.8rem", marginBottom: 20 }}>
        {category.toUpperCase()} {subcategory.replace(/-/g, " ").toUpperCase()}
      </h1> <CategoryContainerMenu/>

      {/* PASAMOS AMBOS FILTROS */}
      <ProductsList
        categorySlug={category}
        subCategorySlug={subcategory}
      />
    </div>
  );
}
