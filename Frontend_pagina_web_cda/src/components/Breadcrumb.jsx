"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import "./breadcrumb.css";

export default function Breadcrumb() {
  const pathname = usePathname()?.trim() || "/";

  // ⬅️ MEMO: evita recalcular en cada render
  const filteredSegments = useMemo(() => {
    if (pathname === "/") return [];

    return pathname
      .split("/")
      .filter(Boolean)
      .filter((seg) => seg !== "categories");
  }, [pathname]);

  // ⬅️ MEMO: genera todos los paths y labels
  const crumbs = useMemo(() => {
    return filteredSegments.map((segment, index) => {
      const href = `/categories/${filteredSegments
        .slice(0, index + 1)
        .join("/")}`;

      return {
        href,
        label: segment.replace(/-/g, " "),
        isLast: index === filteredSegments.length - 1,
      };
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
