"use client";

import { useState } from "react";
import "./workWithUs.css";

export default function WorkWithUs() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData(e.target);

    try {
      const res = await fetch("/api/work-with-us", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Error al enviar");

      setSuccess(true);
      e.target.reset();
    } catch (err) {
      setError("Ocurrió un error al enviar tu postulación. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="work-with-us">
      <div className="work-with-us__container">
        <h2>Trabaja con nosotros</h2>
        <p className="subtitle">
          Completa el formulario y adjunta tu hoja de vida.
        </p>

        <form className="work-with-us__form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombres</label>
            <input type="text" name="names" required />
          </div>

          <div className="form-group">
            <label>Apellidos</label>
            <input type="text" name="lastnames" required />
          </div>

          <div className="form-group">
            <label>Teléfono</label>
            <input type="tel" name="phone" required />
          </div>

          <div className="form-group">
            <label>Correo electrónico</label>
            <input type="email" name="email" required />
          </div>

          <div className="form-group">
            <label>Ciudad</label>
            <input type="text" name="city" required />
          </div>

          <div className="form-group">
            <label>Comentario</label>
            <textarea name="comment" rows="4" />
          </div>

          <div className="form-group file-group">
            <label className="file-label">
              Adjuntar hoja de vida
              <input
                type="file"
                name="cv"
                accept=".pdf,.doc,.docx"
                required
              />
            </label>
          </div>

          <div className="form-check">
            <input type="checkbox" id="privacy" required />
            <label htmlFor="privacy">
              Conozco y acepto la{" "}
              <a href="/politica-de-privacidad" target="_blank">
                política de privacidad de datos
              </a>{" "}
              de Contenedores de Antioquia.
            </label>
          </div>

          <div className="form-check">
            <input type="checkbox" id="promo" />
            <label htmlFor="promo">
              Acepto recibir información promocional.
            </label>
          </div>

          {error && <p className="form-error">{error}</p>}
          {success && (
            <p className="form-success">
              ✅ Postulación enviada correctamente. Pronto nos pondremos en
              contacto.
            </p>
          )}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Enviando..." : "Enviar postulación"}
          </button>

          {/* BOTÓN WHATSAPP RRHH */}
          <a
            href="https://wa.me/573183355605?text=Hola,%20quiero%20trabajar%20con%20ustedes.%20¿Qué%20vacantes%20tienen%20disponibles?"
            target="_blank"
            className="whatsapp-btn"
          >
            <img
              src="/img/Logos-whatsapp-Contenedores-de-Antioquia.png"
              alt="WhatsApp"
              className="whatsapp-icon"
            />
            Contactar a Recursos Humanos
          </a>
        </form>
      </div>
    </section>
  );
}
