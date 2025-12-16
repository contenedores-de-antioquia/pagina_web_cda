"use client";

import { useEffect, useState, use } from "react";
import "./furniture.css";

export default function FurniturePage({ params }) {

  // ⛔ Antes: const { slug } = params;
  // ✅ Ahora usamos React.use() para obtener params reales:
  const { slug } = use(params);

  const [item, setItem] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/furnitures?filters[slug][$eq]=${slug}&populate=*`,
        { cache: "no-store" }
      );

      const json = await res.json();
      const entry = json?.data?.[0];
      if (!entry) return setItem(null);

      const data = entry;

      const images =
        data.images?.map(
          (img) => `${process.env.NEXT_PUBLIC_STRAPI_URL}${img.url}`
        ) || [];

      const getMaterialUrl = (m) =>
        m ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${m.url}` : null;

      const material01 = data.material01 ? getMaterialUrl(data.material01) : null;
      const material02 = data.material02 ? getMaterialUrl(data.material02) : null;
      const material03 = data.material03 ? getMaterialUrl(data.material03) : null;

      const material04 =
        Array.isArray(data.material04)
          ? data.material04.map((m) => getMaterialUrl(m))
          : [];

      setItem({
        id: data.id,
        name: data.fornitureName,
        slug: data.slug,
        rent: data.rent,
        saleValue: data.saleValue,
        description: data.description,
        height: data.height,
        width: data.width,
        long: data.long,
        categories: data.categories || [],
        images,
        materials: {
          material01,
          material02,
          material03,
          material04,
        },
      });
    }

    fetchData();
  }, [slug]);

  if (!item) return <h1 style={{ padding: 40 }}>Mobiliario no encontrado</h1>;

  const whatsappMsg = `Hola, quiero cotizar la compra de ${item.slug}`;
  const whatsappUrl = `https://wa.me/573158246718?text=${encodeURIComponent(
    whatsappMsg
  )}`;

  return (
    <div className="furniture-container">

      <h1 className="title">{item.name}</h1>

      {item.categories.length > 0 && (
        <p className="category">
          Categoría: {item.categories[0].categoryName}
        </p>
      )}

      {item.images.length > 0 && (
        <img className="main-image" src={item.images[0]} alt={item.name} />
      )}

      {/* Caja de precio y compra estilo Apple */}
      <div className="purchase-box">
        <h3 className="purchase-title">Cotiza servicio logístico</h3>

        <div className="price-row">
          <div className="price-info">
            <p className="price-label">Venta</p>
            <p className="price-value">
              ${item.saleValue.toLocaleString()}
            </p>
            <span className="iva">IVA incluido</span>
          </div>

        <a href={whatsappUrl} target="_blank" className="buy-button">
            Comprar
          </a>
        </div>

        <p className="description-text">
          {item.description}
        </p>
      </div>

      {/* Medidas */}
      <div className="measurements-box">
        <div className="measure-item">
          <h4>Alto</h4>
          <p>{item.height} m</p>
        </div>

        <div className="measure-item">
          <h4>Largo</h4>
          <p>{item.long} m</p>
        </div>

        <div className="measure-item">
          <h4>Ancho</h4>
          <p>{item.width} m</p>
        </div>
      </div>

      {/* Materiales */}
      <h2 className="subtitle">Materiales</h2>

      <div className="materials">
        {item.materials.material01 && (
          <img src={item.materials.material01} className="material-img" />
        )}

        {item.materials.material02 && (
          <img src={item.materials.material02} className="material-img" />
        )}

        {item.materials.material03 && (
          <img src={item.materials.material03} className="material-img" />
        )}

        {item.materials.material04.map((m, i) => (
          <img key={i} src={m} className="material-img" />
        ))}
      </div>

      {/* Galería */}
      <h2 className="subtitle">Galería</h2>
      <div className="gallery">
        {item.images.map((img, i) => (
          <img key={i} src={img} alt={`img-${i}`} className="gallery-image" />
        ))}
      </div>
    </div>
  );
}