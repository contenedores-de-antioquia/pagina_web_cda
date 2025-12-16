import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {Flow_Block} from "next/font/google";
import "./globals.css";

import type { ReactNode } from "react";

export const metadata = {
  title: "Contenedores de Antioquia | página-de-inicio | Contenedores maritímos",
  descripcion: "Esta es lapagina principal de Contenedores de Antioquia",
  Keywords: "tienda, online, conteneores, contenedor maritimos, containers, alquiler de contenedores maritímos"
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <section>
          <Navbar />
        </section>
        {children}
        <section>
          <Footer/>
        </section>
      </body>
    </html>
  );
}