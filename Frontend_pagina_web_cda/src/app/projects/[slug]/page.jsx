"use client";

import { useEffect, useState } from "react";

export default function ProjectPage({ params }) {
  const { slug } = params;
  const [project, setProject] = useState(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/projects?filters[slug][$eq]=${slug}&populate=*`,
          { cache: "no-store" }
        );

        const json = await res.json();
        const entry = json?.data?.[0];

        if (!entry) return setProject(null);

        const attrs = entry.attributes;

        // 🔵 Función para usar el mejor formato disponible
        const getURL = (img) => {
          if (!img) return null;

          const fm = img.formats;
          if (fm?.medium?.url)
            return `${process.env.NEXT_PUBLIC_STRAPI_URL}${fm.medium.url}`;
          if (fm?.small?.url)
            return `${process.env.NEXT_PUBLIC_STRAPI_URL}${fm.small.url}`;
          if (img.url)
            return `${process.env.NEXT_PUBLIC_STRAPI_URL}${img.url}`;

          return null;
        };

        // 🖼️ Galería
        const images =
          attrs.projectImages?.data?.map((img) =>
            getURL(img.attributes)
          ) || [];

        setProject({
          id: entry.id,
          name: attrs.projectName,
          description: attrs.projectDescription,
          location: attrs.location || null,
          images,
        });
      } catch (error) {
        console.error("❌ Error cargando proyecto:", error);
      }
    }

    fetchProject();
  }, [slug]);

  if (!project)
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">Proyecto no encontrado.</h1>
      </div>
    );

  return (
    <div className="px-10 py-20">
      {/* 🏗️ TÍTULO */}
      <h1 className="text-4xl font-bold mb-4">{project.name}</h1>

      {/* 📍 UBICACIÓN OPCIONAL */}
      {project.location && (
        <p className="text-gray-600 mb-4">📍 {project.location}</p>
      )}

      {/* 🖼️ GALERÍA */}
      {project.images.length > 0 && (
        <div className="flex gap-4 overflow-x-auto mb-10">
          {project.images.map((img, i) => (
            <img
              key={i}
              src={img}
              className="rounded-lg w-[320px] h-auto shadow"
            />
          ))}
        </div>
      )}

      {/* 📄 DESCRIPCIÓN */}
      {project.description && (
        <p className="text-lg leading-relaxed">{project.description}</p>
      )}
    </div>
  );
}
