import Link from "next/link";
import "./blogList.css";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

// 👉 FUNCIÓN PARA LIMITAR TEXTO
function truncateText(text = "", maxLength = 140) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

async function getBlogs() {
  const res = await fetch(
    `${STRAPI_URL}/api/blogs?populate=blogImage&filters[activeOInactiveBlog][$eq]=true`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];

  const json = await res.json();

  // Solo blogs que tengan slug
  return json.data.filter((blog) => blog.blogSlug);
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <section className="blog-container">
      <h1 className="blog-title">Nuestro Blog</h1>

      <div className="blog-grid">
        {blogs.map((blog) => {
          const imageUrl =
            blog.blogImage?.formats?.medium?.url ||
            blog.blogImage?.url ||
            "/placeholder.jpg";

          return (
            <Link
              key={blog.id}
              href={`/blog/${blog.blogSlug}`}
              className="blog-card"
            >
              {/* IMAGEN CON TAMAÑO ESTÁNDAR */}
              <div className="blog-image">
                <img
                  src={`${STRAPI_URL}${imageUrl}`}
                  alt={blog.blogTitle}
                  loading="lazy"
                />
              </div>

              {/* CONTENIDO */}
              <div className="blog-content">
                <h2>{blog.blogTitle}</h2>

                <p>
                  {truncateText(blog.blogSummaryText, 140)}
                </p>

                <span className="read-more">
                  Leer artículo →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

