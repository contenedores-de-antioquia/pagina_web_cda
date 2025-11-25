"use client";

import React from "react";
import ProductsList from "@/components/productsList";

export default function CategoryPage({ params }) {
  const { category } = React.use(params);

  return (
    <div style={{ padding: 20 }}>
      <h1> {category}</h1>
      <ProductsList categorySlug={category} />
    </div>
  );
}
