"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ContainerSubcategories() {
  const [subcats, setSubcats] = useState([]);

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `${baseUrl}/api/container-categories?populate=imgContainerCategory`,
          { cache: "no-store" }
        );
        const json = await res.json();

        if (!json.data) return;

        // ORDENAR AUTOMÁTICO → 10 ➜ 20 ➜ 40
        const ordered = json.data.sort((a, b) => {
          const nA = parseInt(a.nameCategoryContainers);
          const nB = parseInt(b.nameCategoryContainers);
          return nA - nB;
        });

        setSubcats(ordered);
      } catch (err) {
        console.error("❌ Error cargando subcategorías:", err);
      }
    }
    load();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="text-2xl font-bold mb-4">Categorías de Contenedores</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {subcats.map((cat) => {
          const img =
            cat.imgContainerCategory?.formats?.medium?.url ||
            cat.imgContainerCategory?.url;

          return (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="block border rounded-lg overflow-hidden shadow hover:shadow-lg"
            >
              <img
                src={`${baseUrl}${img}`}
                className="w-full h-40 object-cover"
                alt={cat.nameCategoryContainers}
              />

              <div className="p-4 text-center font-semibold">
                {cat.nameCategoryContainers}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
