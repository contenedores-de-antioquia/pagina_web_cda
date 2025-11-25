"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();

  // dividir la ruta
  const segments = pathname.split("/").filter(Boolean);

  // remover "categories"
  const filtered = segments.filter(seg => seg !== "categories");

  return (
    <div className="px-6 py-3 text-sm text-gray-600">
      <Link href="/" className="text-blue-600 hover:underline">
        Inicio
      </Link>

      {filtered.map((segment, index) => {
        const href = "/" + filtered.slice(0, index + 1).join("/");
        const label = segment.replace("-", " ");

        return (
          <span key={index}>
            {" / "}
            <Link href={href} className="text-blue-600 hover:underline capitalize">
              {label}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
