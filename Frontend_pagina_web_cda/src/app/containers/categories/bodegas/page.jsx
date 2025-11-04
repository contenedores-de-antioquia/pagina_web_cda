import React from "react";

export default async function BodegasPage() {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  const res = await fetch(
    `${STRAPI_URL}/api/products?filters[category][slug][$eq]=bodegas&populate=*`,
    { cache: "no-store" }
  );

  const data = await res.json();
  const products = data?.data || [];

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        Productos de la categoría: Bodegas
      </h1>

      {products.length === 0 ? (
        <p>No hay productos disponibles en esta categoría.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {products.map((product) => {
            const attrs = product?.attributes || {};
            const imageUrl = attrs?.images?.data?.[0]?.attributes?.url;
            const title =
              attrs?.title ||
              attrs?.name ||
              attrs?.nombre ||
              "Producto sin título";
            const description =
              attrs?.description ||
              attrs?.descriptionShort ||
              attrs?.descripcion ||
              attrs?.descripcionCorta ||
              "Sin descripción disponible";

            return (
              <div
                key={product.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "20px",
                  backgroundColor: "#fff",
                  textAlign: "center",
                }}
              >
                {imageUrl && (
                  <img
                    src={`${STRAPI_URL}${imageUrl}`}
                    alt={title}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  />
                )}
                <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>
                  {title}
                </h2>
                <p>{description}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

