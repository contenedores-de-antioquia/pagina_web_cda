"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import "./breadcrumb.css";

// 🔥 Mapa para convertir slugs en nombres visibles
const nameMap = {
  bodegas: "Bodegas",
  contenedores: "Contenedores",
  "contenedor-10-pies": "Contenedor de 10 pies",
  "contenedor-20-pies": "Contenedor de 20 pies",
  "contenedor-40-pies": "Contenedor de 40 pies",
};

export default function Breadcrumb() {
  const pathname = usePathname()?.trim() || "/";

  const filteredSegments = useMemo(() => {
    if (pathname === "/") return [];
    return pathname
      .split("/")
      .filter(Boolean)
      .filter((seg) => seg !== "categories");
  }, [pathname]);

  // 🔥 Buscar último segmento → si es producto, NO usar map → usar productName
  const crumbs = useMemo(() => {
    return filteredSegments.map((segment, index) => {
      const isLast = index === filteredSegments.length - 1;

      // Ruta acumulada
      const href = "/" + filteredSegments.slice(0, index + 1).join("/");

      // Último → producto → se usa el slug pero formateado
      let label =
        nameMap[segment] || segment.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());

      return { href, label, isLast };
    });
  }, [filteredSegments]);

  return (
    <div className="breadcrumb-container">
      <Link href="/" className="breadcrumb-link">
        Inicio
      </Link>

      {crumbs.map((c, i) => (
        <span key={i}>
          <span className="breadcrumb-separator">/</span>

          <Link
            href={c.href}
            className={c.isLast ? "breadcrumb-active" : "breadcrumb-link"}
          >
            {c.label}
          </Link>
        </span>
      ))}
    </div>
  );
}
