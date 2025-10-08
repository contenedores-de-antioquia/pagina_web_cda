import Link from "next/link";
import React from "react";
import "./navbarcontainers.css";

export default function NavbarContainer() {
  return (
    <nav className="NavbarContainers">
      <ul className="CircleNavbar">

        <li>
          <Link className="CircleNavbar-link" href="/containers/categories/bodegas">
            <img
              className="NavbarContainers-img"
              src="/img/diseño-banner-página.png"
              alt="img-bodega"
            />
            <span className="CircleNavbar-text">Bodegas</span>
          </Link>
        </li>

        <li>
          <Link className="CircleNavbar-link" href="/containers/categories/oficinas">
            <img
              className="NavbarContainers-img"
              src="/img/diseño-banner-página.png"
              alt="img-oficina"
            />
            <span className="CircleNavbar-text">Oficinas</span>
          </Link>
        </li>

        <li>
          <Link className="CircleNavbar-link" href="/containers/categories/locales">
            <img
              className="NavbarContainers-img"
              src="/img/diseño-banner-página.png"
              alt="img-locales"
            />
            <span className="CircleNavbar-text">Locales</span>
          </Link>
        </li>

        <li>
          <Link className="CircleNavbar-link" href="/containers/categories/banos">
            <img
              className="NavbarContainers-img"
              src="/img/diseño-banner-página.png"
              alt="img-baños"
            />
            <span className="CircleNavbar-text">Baños</span>
          </Link>
        </li>

        <li>
          <Link className="CircleNavbar-link" href="/containers/categories/polvorines">
            <img
              className="NavbarContainers-img"
              src="/img/diseño-banner-página.png"
              alt="img-polvorines"
            />
            <span className="CircleNavbar-text">Polvorines</span>
          </Link>
        </li>

        <li>
          <Link className="CircleNavbar-link" href="/containers/categories/habitaciones">
            <img
              className="NavbarContainers-img"
              src="/img/diseño-banner-página.png"
              alt="img-habitaciones"
            />
            <span className="CircleNavbar-text">Habitaciones</span>
          </Link>
        </li>

      </ul>
    </nav>
  );
}
