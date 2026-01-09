import Link from "next/link";
import "./blog.css";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

async function getPost(slug) {
  const res = await fetch(
    `${STRAPI_URL}/api/blogs?filters[blogSlug][$eq]=${slug}&populate=blogImage`,
    { cache: "no-store" }
  );
  const json = await res.json();
  return json.data[0];
}

async function getOtherPosts(slug) {
  const res = await fetch(
    `${STRAPI_URL}/api/blogs?filters[blogSlug][$ne]=${slug}&populate=blogImage&pagination[limit]=4`,
    { cache: "no-store" }
  );
  const json = await res.json();
  return json.data;
}

export default async function BlogSlugPage({ params }) {
  const post = await getPost(params.blogslug);
  const otherPosts = await getOtherPosts(params.blogslug);

  if (!post) {
    return <h1 className="not-found">Post no encontrado</h1>;
  }

  const imageUrl =
    post.blogImage?.formats?.large?.url || post.blogImage?.url;

  return (
    <article className="blog-slug-container">
      <h1 className="blog-title">{post.blogTitle}</h1>

      {imageUrl && (
        <img
          src={`${STRAPI_URL}${imageUrl}`}
          alt={post.blogTitle}
          className="blog-image"
        />
      )}

      <div className="blog-content">
        {post.blogText.split("\n").map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {/* 🔗 REDES SOCIALES */}
      <div className="blog-socials">
        <a
          href="https://www.instagram.com/contenedores_ant/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/img/Instagram-Contenedores-de-Antioquia.png"
            alt="Instagram"
          />
        </a>

        <a
          href="https://www.linkedin.com/company/contenedoresdeantioquia?originalSubdomain=co"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/img/Linkedin-Contenedores-de-Antioquia.png"
            alt="LinkedIn"
          />
        </a>

        <a
          href="https://www.facebook.com/ContenedoresdeAntioquia/?locale=es_LA"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/img/Facebook-Contenedores-de-Antioquia.png"
            alt="Facebook"
          />
        </a>

        <a
          href="https://www.youtube.com/channel/UCIIrJuxjUPfITWhT8HzrZjA"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/img/Youtube-Contenedores-de-Antioquia.png"
            alt="YouTube"
          />
        </a>

        <a
          href="https://wa.me/573158246718?text=Hola,%20quiero%20una%20asesoría%20gratuita."
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/img/Whatsapp-Contenedores-de-Antioquia.png"
            alt="WhatsApp"
          />
        </a>
      </div>

      {/* 📰 OTROS POSTS */}
      <section className="other-posts">
        <h2>Otros artículos</h2>
        <div className="other-posts-grid">
          {otherPosts.map((blog) => {
            const img =
              blog.blogImage?.formats?.small?.url ||
              blog.blogImage?.url;

            return (
              <Link
                key={blog.id}
                href={`/blog/${blog.blogSlug}`}
                className="other-post-card"
              >
                {img && (
                  <img
                    src={`${STRAPI_URL}${img}`}
                    alt={blog.blogTitle}
                  />
                )}
                <h3>{blog.blogTitle}</h3>
              </Link>
            );
          })}
        </div>
      </section>
    </article>
  );
}

