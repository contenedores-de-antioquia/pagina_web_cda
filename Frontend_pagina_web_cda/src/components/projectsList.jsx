"use client";
import React, { useEffect, useState, useCallback } from "react";
import "./projectsList.css";

const BASE_URL = "http://localhost:1337";

const ProjectsList = ({ categorySlug }) => {
  const [projects, setProjects] = useState([]);

  /* Normaliza URL */
  const normalizeUrl = (url) =>
    url ? (url.startsWith("http") ? url : `${BASE_URL}${url}`) : null;

  /* Fetch optimizado */
  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/projects?populate=*&filters[categories][slug][$eq]=${categorySlug}`
      );
      const json = await res.json();

      if (!json?.data) return;

      const mapped = json.data.map((item) => {
        const attrs = item;

        // Obtiene imágenes desde cualquier estructura posible
        const imgs =
          attrs.images ||
          attrs.projectImages?.data?.map((img) => img.attributes || img) ||
          [];

        return {
          id: item.id,
          name: attrs.projectName || "Sin nombre",
          saleValue: attrs.saleValue,
          rentalValue: attrs.rentalValue,
          categories: attrs.container_categories || [],
          images: imgs,
          slug: attrs.slug,
        };
      });

      setProjects(mapped);
    } catch (e) {
      console.error("❌ Error cargando proyectos:", e);
    }
  }, [categorySlug]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div className="products-grid">
      {projects.map((p) => {
        const mainImg = normalizeUrl(p.images?.[0]?.url);

        return (
          <div key={p.id} className="product-card">
            {/* IMAGEN */}
            <div className="product-image">
              {mainImg ? (
                <img
                  src={mainImg}
                  alt={p.name}
                  className="image-slide"
                  loading="lazy"
                />
              ) : (
                <p style={{ padding: 10 }}>Sin imágenes</p>
              )}
            </div>

            {/* INFO */}
            <div className="product-info">
              <h3 className="product-name">{p.name}</h3>

              {p.categories.length > 0 && (
                <p className="product-status">
                  {p.categories.map((c) => c.name).join(", ")}
                </p>
              )}

              {/* Valor venta */}
              <div className="product-price-section">
                <p className="product-price-label">Valor venta:</p>
                <p className="product-price-value">
                  {p.saleValue
                    ? `$${new Intl.NumberFormat().format(p.saleValue)}`
                    : "No disponible"}
                </p>
              </div>

              {/* Valor alquiler */}
              <div className="product-price-section">
                <p className="product-price-label">Valor alquiler:</p>
                <p className="product-price-value">
                  {p.rentalValue
                    ? `$${new Intl.NumberFormat().format(p.rentalValue)}`
                    : "No disponible"}
                </p>
              </div>

              {/* BTN */}
              <a href={`/projects/${p.slug}`} className="product-btn">
                Ver proyecto
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectsList;

