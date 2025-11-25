"use client";

import { useEffect, useState } from "react";




export default function ProductPage({ params }) {
  const { slug } = params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products?filters[slug][$eq]=${slug}&populate=*`,
          { cache: "no-store" }
        );

        const json = await res.json();
        const item = json?.data?.[0];

        if (!item) return setProduct(null);

        // 📌 Strapi te entrega el producto PLANO, NO dentro de attributes
        const attrs = item;

        const getImageURL = (img) => {
          if (!img) return null;

          // si existe formato medium → usarlo
          if (img.formats?.medium?.url)
            return `${process.env.NEXT_PUBLIC_STRAPI_URL}${img.formats.medium.url}`;

          // si existe small
          if (img.formats?.small?.url)
            return `${process.env.NEXT_PUBLIC_STRAPI_URL}${img.formats.small.url}`;

          // fallback
          if (img.url)
            return `${process.env.NEXT_PUBLIC_STRAPI_URL}${img.url}`;

          return null;
        };

        const imagesArray = [];

        // 📌 Si algún día images deja de ser null
        if (attrs.images && Array.isArray(attrs.images)) {
          attrs.images.forEach((img) => {
            imagesArray.push(`${process.env.NEXT_PUBLIC_STRAPI_URL}${img.url}`);
          });
        }

        // 📌 imageMeasurements (siempre existe según tu JSON)
        if (attrs.imageMeasurements?.url) {
          imagesArray.push(getImageURL(attrs.imageMeasurements));
        }

        setProduct({
          id: item.id,
          name: attrs.productName,
          description: attrs.description || attrs.productDescription,
          newOrUsed: attrs.newOrUsed,
          sale: attrs.saleValue,
          rent: attrs.rentalValue,
          images: imagesArray, // ✔ ahora SIEMPRE será un array de imágenes
          coatingImage: getImageURL(attrs.typeOfCoating),
          floorImage: getImageURL(attrs.typeOfFloor),
        });
      } catch (err) {
        console.error("❌ Error al cargar producto:", err);
      }
    }

    fetchProduct();
  }, [slug]);

  if (!product) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">Producto no encontrado.</h1>
      </div>
    );
  }

  return (
    <div className="px-10 py-20">
    
      <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-600 mb-6">{product.newOrUsed}</p>

      {/* 🖼️ CARRUSEL SIMPLE CON TODAS LAS IMÁGENES */}
      {product.images.length > 0 && (
        <div className="flex gap-4 overflow-x-auto mb-10">
          {product.images.map((img, i) => (
            <img
              key={i}
              src={img}
              className="rounded-lg w-[300px] h-auto"
            />
          ))}
        </div>
      )}

      {/* 🔵 DESCRIPCIÓN */}
      <p className="text-lg leading-relaxed mb-10">
        {product.description}
      </p>

      {/* ⭐ COATING & FLOOR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {product.coatingImage && (
          <div>
            <h3 className="font-bold mb-2">Tipo de Acabado</h3>
            <img src={product.coatingImage} className="rounded-lg" />
          </div>
        )}

        {product.floorImage && (
          <div>
            <h3 className="font-bold mb-2">Tipo de Piso</h3>
            <img src={product.floorImage} className="rounded-lg" />
          </div>
        )}
      </div>

      {/* 💰 VALORES */}
      <div className="mt-10">
        {product.sale && (
          <p className="text-xl font-bold">Valor venta: ${product.sale}</p>
        )}

        {product.rent && (
          <p className="text-xl font-bold mt-2">Valor renta: ${product.rent}</p>
        )}
      </div>
    </div>
  );
}
