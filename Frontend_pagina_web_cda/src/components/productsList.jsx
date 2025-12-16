"use client"; 

import React, { useEffect, useState, useMemo, useCallback } from "react";
import "./productsList.css";

const BASE_URL = "http://localhost:1337";

export default function ProductsList({ categorySlug, subCategorySlug }) {
  const [items, setItems] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setSelectedProject(null);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const normalizeImage = (img) =>
    img ? (img.startsWith("http") ? img : `${BASE_URL}${img}`) : null;

  const mapData = (data) =>
    data.map((item) => {
      const a = item.attributes || item;

      let img =
        a.projectImages?.[0]?.url ||
        a.images?.[0]?.url ||
        null;

      img = normalizeImage(img);

      return {
        id: item.id,
        name: a.projectName || a.productName || a.fornitureName,
        description: a.projectDescription || a.description || "",
        slug: a.slug,
        type: a.projectName
          ? "project"
          : a.productName
          ? "product"
          : "furniture",
        imageUrl: img,
        gallery: a.projectImages?.map((g) => normalizeImage(g.url)) || [],
        saleValue: a.saleValue,
        rentalValue: a.rentalValue,

        /* ⭐ CORREGIDO — AHORA FUNCIONA ⭐ */
        subCategory:
          a.container_categories?.data?.[0]?.attributes?.nameCategoryContainers || null,

        newOrUsed: a.newOrUsed || null,
      };
    });

  const fetchAll = useCallback(async () => {
    try {
      const endpoints = [
        `/api/products?populate=*&filters[categories][slug][$eq]=${categorySlug}`,
        `/api/projects?populate=*&filters[categories][slug][$eq]=${categorySlug}`,
        `/api/furnitures?populate=*&filters[categories][slug][$eq]=${categorySlug}`,
      ];

      if (subCategorySlug) {
        endpoints[0] += `&filters[container_categories][slug][$eq]=${subCategorySlug}`;
      }

      const responses = await Promise.all(
        endpoints.map((url) =>
          fetch(`${BASE_URL}${url}`).then((r) => r.json())
        )
      );

      let merged = [];
      responses.forEach((res) => {
        if (res?.data) merged.push(...mapData(res.data));
      });

      setItems(merged);
    } catch (err) {
      console.log("❌ Error cargando items", err);
    }
  }, [categorySlug, subCategorySlug]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const projectItems = useMemo(
    () => items.filter((i) => i.type === "project"),
    [items]
  );

  const goNext = () => {
    const i = projectItems.findIndex((p) => p.id === selectedProject.id);
    setSelectedProject(projectItems[(i + 1) % projectItems.length]);
  };

  const goPrev = () => {
    const i = projectItems.findIndex((p) => p.id === selectedProject.id);
    setSelectedProject(
      projectItems[(i - 1 + projectItems.length) % projectItems.length]
    );
  };

  return (
    <>
      <div className="projects-carousel-wrapper">
        <button
          className="carousel-btn carousel-left"
          onClick={() =>
            document
              .querySelector(".projects-row")
              ?.scrollBy({ left: -400, behavior: "smooth" })
          }
        >
          ‹
        </button>

        <div className="projects-row">
          {projectItems.map((i) => (
            <div key={i.id} className="project-card">
              <div
                className="project-bg"
                style={{ backgroundImage: `url(${i.imageUrl})` }}
                onClick={() => setSelectedProject(i)}
              />
              <div className="project-text">
                <h4>Proyecto</h4>
                <h2>{i.name}</h2>
              </div>
              <button
                className="project-circle-btn"
                onClick={() => setSelectedProject(i)}
              >
                +
              </button>
            </div>
          ))}
        </div>

        <button
          className="carousel-btn carousel-right"
          onClick={() =>
            document
              .querySelector(".projects-row")
              ?.scrollBy({ left: 400, behavior: "smooth" })
          }
        >
          ›
        </button>
      </div>

      <div className="products-grid">
        {items
          .filter((i) => i.type !== "project")
          .map((i) => (
            <div key={i.id} className="product-card">
              <div className="product-image">
                {i.imageUrl ? (
                  <img src={i.imageUrl} alt={i.name} loading="lazy" />
                ) : (
                  <p>Sin imagen</p>
                )}
              </div>

              <div className="product-info">
                <h3 className="product-name">{i.name}</h3>

                {i.subCategory && (
                  <p className="product-subcategory">{i.subCategory}</p>
                )}

                {i.type === "product" && i.newOrUsed && (
                  <p className="product-newused">
                    {i.newOrUsed === "new" ? "Nuevo" : "Usado"}
                  </p>
                )}

                {i.saleValue && (
                  <>
                    <p className="product-price-label">Venta</p>
                    <p className="product-price">${i.saleValue}</p>
                    <p className="iva-text">IVA incluido</p>
                    <a
                      href={`https://wa.me/573158246718?text=${encodeURIComponent(
                        `Hola, quiero cotizar la compra de ${subCategorySlug} ${i.slug}`
                      )}`}
                      target="_blank"
                      className="product-btn buy-btn"
                    >
                      Comprar
                    </a>
                  </>
                )}

                {i.rentalValue && (
                  <>
                    <p className="product-price-label">Alquiler</p>
                    <p className="product-price">${i.rentalValue}</p>
                    <p className="iva-text">IVA incluido</p>
                    <a
                      href={`https://wa.me/573158246718?text=${encodeURIComponent(
                        `Hola, quiero cotizar el alquiler de ${subCategorySlug} ${i.slug}`
                      )}`}
                      target="_blank"
                      className="product-btn rent-btn"
                    >
                      Alquiler
                    </a>
                  </>
                )}

                <a
                  href={
                    i.type === "furniture"
                      ? `/furniture/${i.slug}`
                      : `/products/${i.slug}`
                  }
                  className="product-btn"
                >
                  Ver más
                </a>
              </div>
            </div>
          ))}
      </div>

      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setSelectedProject(null)}
            >
              ✕
            </button>

            <button className="modal-nav-btn modal-prev" onClick={goPrev}>
              ‹
            </button>

            <button className="modal-nav-btn modal-next" onClick={goNext}>
              ›
            </button>

            <img
              className="modal-main-img"
              src={selectedProject.imageUrl}
              alt={selectedProject.name}
            />

            <h2 className="modal-title">{selectedProject.name}</h2>

            <p className="modal-description">{selectedProject.description}</p>

            {selectedProject.gallery.length > 1 && (
              <div className="modal-gallery">
                {selectedProject.gallery.map((img, index) => (
                  <img key={index} src={img} alt="" loading="lazy" />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
