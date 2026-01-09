"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function ProjectPage({ params }) {
  const { slug } = params;
  const { language } = useLanguage();

  const [project, setProject] = useState(null);
  const [translatedDescription, setTranslatedDescription] = useState("");

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

        setTranslatedDescription(attrs.projectDescription);
      } catch (error) {
        console.error("❌ Error cargando proyecto:", error);
      }
    }

    fetchProject();
  }, [slug]);

  // 🔤 TRADUCCIÓN AUTOMÁTICA SOLO SI ES INGLÉS
  useEffect(() => {
    async function translateText() {
      if (!project?.description) return;

      if (language === "es") {
        setTranslatedDescription(project.description);
        return;
      }

      try {
        const res = await fetch("https://libretranslate.de/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            q: project.description,
            source: "es",
            target: "en",
            format: "text",
          }),
        });

        const data = await res.json();
        setTranslatedDescription(data.translatedText);
      } catch (error) {
        console.error("❌ Error traduciendo texto:", error);
        setTranslatedDescription(project.description);
      }
    }

    translateText();
  }, [language, project]);

  const t = {
    es: { notFound: "Proyecto no encontrado." },
    en: { notFound: "Project not found." },
  };

  if (!project)
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">{t[language].notFound}</h1>
      </div>
    );

  return (
    <div className="px-10 py-20">
      <h1 className="text-4xl font-bold mb-4">{project.name}</h1>

      {project.location && (
        <p className="text-gray-600 mb-4">📍 {project.location}</p>
      )}

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

      {translatedDescription && (
        <p className="text-lg leading-relaxed">
          {translatedDescription}
        </p>
      )}
    </div>
  );
}


