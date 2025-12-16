"use client";
import React, { useEffect, useState, useCallback } from "react";
import "./projectsCarousel.css";

const BASE_URL = "http://localhost:1337";

const ProjectsCarousel = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  /* ============================
     CARRUSEL DEL MODAL
  ============================= */
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!selectedProject) return;
    const interval = setInterval(() => nextSlide(), 3000);
    return () => clearInterval(interval);
  }, [selectedProject]);

  /* ============================
     Normaliza URLs
  ============================= */
  const normalizeUrl = (url) => {
    if (!url) return null;
    return url.startsWith("http") ? url : `${BASE_URL}${url}`;
  };

  /* ============================
     FETCH
  ============================= */
  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/projects?populate=*`);
      const json = await res.json();

      if (!json?.data) return;

      const mapped = json.data
        .filter((item) => item.active === true)
        .map((item) => {
          const a = item;

          const mainImage = normalizeUrl(a.projectImages?.[0]?.url);
          const gallery =
            a.projectImages?.map((g) => normalizeUrl(g.url)) || [];

          return {
            id: a.id,
            name: a.projectName,
            description: a.projectDescription || "",
            imageUrl: mainImage,
            gallery,
          };
        });

      setProjects(mapped);
    } catch (err) {
      console.error("❌ Error cargando proyectos:", err);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  /* ============================
     SCROLL CARRUSEL PRINCIPAL
  ============================= */
  const scrollRow = (offset) => {
    document.querySelector(".projects-row")?.scrollBy({
      left: offset,
      behavior: "smooth",
    });
  };

  return (
    <div className="projects-carousel-wrapper">

      {/* TÍTULO */}
      <h1 className="projects-title">Proyectos</h1>
      <h1 className="projects-title-text">Llevamos tu idea a la reaidad en contenedres maritimos</h1>

      {/* CARRUSEL PRINCIPAL */}
      <div className="projects-row">
        {projects.map((p) => (
          <div key={p.id} className="project-card">
            <div
              className="project-bg"
              style={{ backgroundImage: `url(${p.imageUrl})` }}
              onClick={() => {
                setSelectedProject(p);
                setCurrentIndex(0);
              }}
            />

            <div className="project-text">
              <h4>Proyecto</h4>
              <h2>{p.name}</h2>
            </div>

            <button
              className="project-circle-btn"
              onClick={() => {
                setSelectedProject(p);
                setCurrentIndex(0);
              }}
            >
              +
            </button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setSelectedProject(null)}
            >
              ✕
            </button>

            {/* CARRUSEL MODAL */}
            <div className="carousel-container">
              {selectedProject.gallery.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className={`carousel-slide ${index === currentIndex ? "active" : ""}`}
                />
              ))}

              <button className="modal-arrow left" onClick={prevSlide}>‹</button>
              <button className="modal-arrow right" onClick={nextSlide}>›</button>

              <div className="carousel-dots">
                {selectedProject.gallery.map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${index === currentIndex ? "active" : ""}`}
                    onClick={() => goToSlide(index)}
                  ></span>
                ))}
              </div>
            </div>

            <h2 className="modal-title">{selectedProject.name}</h2>
            <p className="modal-description">{selectedProject.description}</p>
          </div>
          
        </div>   
      )}
        {/* FLECHAS DEBAJO DEL TÍTULO */}
        <div className="top-arrows">
            <button className="carousel-btn-main" onClick={() => scrollRow(-400)}>‹</button>
            <button className="carousel-btn-main" onClick={() => scrollRow(400)}>›</button>
        </div>
    </div>
    
  );
};

export default ProjectsCarousel;
