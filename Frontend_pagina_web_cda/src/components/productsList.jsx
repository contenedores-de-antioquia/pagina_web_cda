"use client";
import React, { useEffect, useState } from "react";

const ProductsList = ({ categorySlug }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoints = [
          `/api/projects?populate=*&filters[categories][slug][$eq]=${categorySlug}`,
          `/api/products?populate=*&filters[categories][slug][$eq]=${categorySlug}`,
          `/api/furnitures?populate=*&filters[categories][slug][$eq]=${categorySlug}`,
        ];

        let allData = [];

        for (const endpoint of endpoints) {
          const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}${endpoint}`);
          const json = await res.json();
          if (!json.data || json.data.length === 0) continue;

          const mapped = json.data.map((entry) => {
            const attrs = entry;

            let type = "";
            let name = "";
            let description = "";
            let sale = null;
            let rent = null;
            let images = [];

            // 🔵 Identificación según campos reales
            if (attrs.productName) type = "products";
            else if (attrs.projectName) type = "projects";
            else type = "furniture";

            // ---------- PRODUCTOS ----------
            if (type === "products") {
              name = attrs.productName;
              sale = attrs.saleValue;
              rent = attrs.rentalValue;

              if (attrs.images && Array.isArray(attrs.images)) {
                images = attrs.images.map((img) => {
                  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${img.url}`;
                });
              }

              if (attrs.imageMeasurements?.url) {
                images.push(
                  `${process.env.NEXT_PUBLIC_STRAPI_URL}${attrs.imageMeasurements.url}`
                );
              }
            }

            // ---------- FURNITURE ----------
            if (type === "furniture") {
              name = attrs.fornitureName;
              sale = attrs.saleValue;
              rent = attrs.rent;

              if (attrs.images && Array.isArray(attrs.images)) {
                images = attrs.images.map((img) => {
                  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${img.url}`;
                });
              }
            }

            // ---------- PROJECTS ----------
            if (type === "projects") {
              name = attrs.projectName;
              description = attrs.projectDescription;

              if (attrs.projectImages && Array.isArray(attrs.projectImages)) {
                images = attrs.projectImages.map((img) => {
                  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${img.url}`;
                });
              }
            }

            return {
              id: entry.id,
              slug: attrs.slug,
              type,
              name,
              description,
              sale,
              rent,
              images,
            };
          });

          allData = [...allData, ...mapped];
        }

        setItems(allData);
      } catch (error) {
        console.error("❌ Fetch error:", error);
      }
    };

    fetchData();
  }, [categorySlug]);

  return (
    <div>
      <h2>Resultados para: {categorySlug}</h2>

      {items.map((item) => (
        <div key={item.id} style={{ padding: 20, borderBottom: "1px solid #ddd" }}>
          <h3>{item.name}</h3>

          {item.description && <p>{item.description}</p>}

          {item.sale && <p><strong>Venta:</strong> {item.sale}</p>}
          {item.rent && <p><strong>Renta:</strong> {item.rent}</p>}

          {/* Mostrar TODAS las imágenes */}
          {item.images && item.images.length > 0 && (
            <div style={{ display: "flex", gap: 10, overflowX: "auto" }}>
              {item.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  width={200}
                  style={{ borderRadius: 8 }}
                />
              ))}
            </div>
          )}

          {/* 🔵 BOTÓN REDIRECCIONADOR CORRECTO */}
          <button
            style={{
              marginTop: 10,
              padding: "8px 12px",
              background: "#007bff",
              color: "white",
              borderRadius: 5,
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => {
              const path =
                item.type === "products"
                  ? `/products/${item.slug}`
                  : item.type === "projects"
                  ? `/projects/${item.slug}`
                  : `/furniture/${item.slug}`;

              window.location.href = path;
            }}
          >
            Ver más información
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
