import "./banners.css";

export default function Banners() {
  return (
    <div>
      <div className="bannerSlider">
        <div className="slides">
          <img src="\img\diseño-banner-página.png" alt="Banner 1" />
          <img src="\img\diseño-banner-página.png" alt="Banner 2" />
          <img src="\img\diseño-banner-página.png" alt="Banner 3" />
        </div>

        {/* Puntitos de navegación */}
        <div className="dots">
          <span className="active"></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Texto inferior */}
      <p className="textoLogistica">
        Servicio logístico para tu proyecto{" "}
        <span className="resaltadoVerde">a nivel nacional.</span>
      </p>
    </div>
  );
}
