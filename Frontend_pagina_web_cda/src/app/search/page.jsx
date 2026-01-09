import Link from "next/link";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

async function searchStrapi(query) {
  const endpoints = [
    {
      type: "Productos",
      url: `${STRAPI_URL}/api/products?filters[$or][0][name][$containsi]=${query}&filters[$or][1][description][$containsi]=${query}`,
      getLink: (item) => `/categories/${item.category?.slug}/${item.slug}`,
      getTitle: (item) => item.name,
    },
    {
      type: "Blog",
      url: `${STRAPI_URL}/api/blogs?filters[$or][0][blogTitle][$containsi]=${query}&filters[$or][1][blogSummaryText][$containsi]=${query}`,
      getLink: (item) => `/blog/${item.blogSlug}`,
      getTitle: (item) => item.blogTitle,
    },
    {
      type: "Proyectos",
      url: `${STRAPI_URL}/api/projects?filters[$or][0][title][$containsi]=${query}&filters[$or][1][description][$containsi]=${query}`,
      getLink: (item) => `/categories/proyectos/${item.slug}`,
      getTitle: (item) => item.title,
    },
    {
      type: "Mobiliario",
      url: `${STRAPI_URL}/api/furnitures?filters[$or][0][name][$containsi]=${query}&filters[$or][1][description][$containsi]=${query}`,
      getLink: (item) => `/categories/mobiliario/${item.slug}`,
      getTitle: (item) => item.name,
    },
  ];

  const results = [];

  for (const endpoint of endpoints) {
    const res = await fetch(endpoint.url, { cache: "no-store" });
    if (!res.ok) continue;

    const json = await res.json();

    json.data?.forEach((item) => {
      results.push({
        type: endpoint.type,
        title: endpoint.getTitle(item),
        link: endpoint.getLink(item),
      });
    });
  }

  return results;
}

export default async function SearchPage({ searchParams }) {
  const query = searchParams.q;

  if (!query) {
    return <p style={{ padding: 40 }}>Escribe algo para buscar.</p>;
  }

  const results = await searchStrapi(query);

  return (
    <section style={{ padding: "40px 20px" }}>
      <h1>Resultados para: "{query}"</h1>

      {results.length === 0 && (
        <p>No se encontraron resultados.</p>
      )}

      <ul style={{ marginTop: 20 }}>
        {results.map((item, index) => (
          <li key={index} style={{ marginBottom: 12 }}>
            <Link href={item.link}>
              <strong>{item.title}</strong>
            </Link>
            <div style={{ fontSize: 12, opacity: 0.7 }}>
              {item.type}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
