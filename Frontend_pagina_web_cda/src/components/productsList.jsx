"use client";

import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";
import "./productsList.css";

const BASE_URL = "http://localhost:1337";
const WHATSAPP_NUMBER = "573158246718";

/* ============================
   FORMATO PESO COLOMBIANO
============================ */
const formatCOP = (value) => {
  if (!value) return null;
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(value);
};

export default function ProductsList({ categorySlug, subCategorySlug }) {
  const [items, setItems] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const projectsRowRef = useRef(null);

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
        subCategory:
          a.container_categories?.data?.[0]?.attributes
            ?.nameCategoryContainers || "",
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

  /* ============================
     PROYECTOS (NO TOCADO)
  ============================ */
  const projectItems = useMemo(
    () => items.filter((i) => i.type === "project"),
    [items]
  );

  const scrollProjects = (direction) => {
    if (!projectsRowRef.current) return;
    const scrollAmount = 380;
    projectsRowRef.current.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  const nextSlide = () => {
    if (!selectedProject) return;
    setCurrentIndex((prev) =>
      prev === selectedProject.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    if (!selectedProject) return;
    setCurrentIndex((prev) =>
      prev === 0 ? selectedProject.gallery.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (!selectedProject) return;
    setCurrentIndex(0);
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, [selectedProject]);

  const whatsappProjectLink = selectedProject
    ? `https://wa.me/573153378600?text=${encodeURIComponent(
        `Hola, vi este proyecto en su página ${selectedProject.name}, quiero hacer una cotización.`
      )}`
    : "#";

  return (
    <>
      {/* ============================
         PROYECTOS (NO TOCADO)
      ============================ */}
      {projectItems.length > 0 && (
        <div className="projects-carousel-wrapper">
          <div className="projects-row" ref={projectsRowRef}>
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

          <div className="projects-bottom-arrows">
            <button onClick={() => scrollProjects("left")}>‹</button>
            <button onClick={() => scrollProjects("right")}>›</button>
          </div>
        </div>
      )}

      {/* ============================
         PRODUCTOS & MOBILIARIO
      ============================ */}
      <div className="products-grid">
        {items
          .filter((i) => i.type !== "project")
          .map((i) => {
            const productLink =
              i.type === "furniture"
                ? `/furniture/${i.slug}`
                : `/products/${i.slug}`;

            const buyLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              `Hola, quiero hacer una cotización de la compra del ${i.subCategory} ${i.name} por valor de ${formatCOP(
                i.saleValue
              )}.`
            )}`;

            const rentLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              `Hola, quiero hacer una cotización del alquiler del ${i.subCategory} ${i.name} por valor de ${formatCOP(
                i.rentalValue
              )}.`
            )}`;

            const logisticsLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              `Hola, quiero cotizar el servicio logístico del ${i.subCategory} ${i.name}.`
            )}`;

            return (
              <div
                key={i.id}
                className="product-card"
                onClick={() => (window.location.href = productLink)}
                style={{ cursor: "pointer" }}
              >
                <div className="product-image">
                  {i.imageUrl ? (
                    <img src={i.imageUrl} alt={i.name} loading="lazy" />
                  ) : (
                    <p>Sin imagen</p>
                  )}
                </div>

                <div
                  className="product-info"
                  onClick={(e) => e.stopPropagation()}
                >
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
                      <p className="product-price">{formatCOP(i.saleValue)}</p>
                      <p className="iva-text">IVA incluido</p>

                      <a
                        href={buyLink}
                        target="_blank"
                        className="action-btn"
                      >
                        Comprar
                      </a>

                      <div className="thin-line" />
                    </>
                  )}

                  {i.rentalValue && (
                    <>
                      <p className="product-price-label">Alquiler</p>
                      <p className="product-price">
                        {formatCOP(i.rentalValue)}
                      </p>
                      <p className="iva-text">IVA incluido</p>

                      <a
                        href={rentLink}
                        target="_blank"
                        className="action-btn"
                      >
                        Alquilar
                      </a>

                      <a
                        href={logisticsLink}
                        target="_blank"
                        className="action-btn secondary"
                      >
                        Cotizar servicio logístico
                      </a>
                    </>
                  )}

                  {/* 🔹 VER MÁS (MISMO LINK DE LA CARD) */}
                  <a href={productLink} className="product-btn">
                    Ver más
                  </a>
                </div>
              </div>
            );
          })}
      </div>

      {/* ============================
         MODAL PROYECTO (NO TOCADO)
      ============================ */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setSelectedProject(null)}
            >
              ✕
            </button>

            <div className="carousel-container">
              {selectedProject.gallery.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className={`carousel-slide ${
                    index === currentIndex ? "active" : ""
                  }`}
                  alt=""
                />
              ))}

              <button className="modal-arrow left" onClick={prevSlide}>‹</button>
              <button className="modal-arrow right" onClick={nextSlide}>›</button>

              <div className="carousel-dots">
                {selectedProject.gallery.map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${
                      index === currentIndex ? "active" : ""
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>
            </div>

            <h2 className="modal-title">{selectedProject.name}</h2>
            <p className="modal-description">
              {selectedProject.description}
            </p>

            <a
              href={whatsappProjectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-project-btn"
            >
              Cotizar un proyecto
            </a>
          </div>
        </div>
      )}
    </>
  );
}
