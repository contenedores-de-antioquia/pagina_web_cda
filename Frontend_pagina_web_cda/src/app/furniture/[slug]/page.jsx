"use client";

import { useEffect, useState } from "react";

export default function FurniturePage({ params }) {
  const { slug } = params;
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/furnitures?filters[slug][$eq]=${slug}&populate=*`,
        { cache: "no-store" }
      );

      const json = await res.json();
      setData(json?.data?.[0] || null);
    }

    fetchData();
  }, [slug]);

  if (!data) return <h1>Mobiliario no encontrado</h1>;

  const attrs = data;

  return (
    <div style={{ padding: 40 }}>
      <h1>{attrs.fornitureName}</h1>

      {attrs.images && attrs.images.length > 0 && (
        <img
          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${attrs.images[0].url}`}
          width={400}
        />
      )}
    </div>
  );
}
