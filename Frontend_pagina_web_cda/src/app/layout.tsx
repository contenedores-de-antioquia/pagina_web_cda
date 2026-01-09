import type { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { LanguageProvider } from "../context/LanguageContext";
import "./globals.css";

export const metadata = {
  title: "Contenedores de Antioquia | Contenedores marítimos y proyectos",
  description:
    "Venta, alquiler y diseño de contenedores marítimos, proyectos especiales y mobiliario.",
  keywords:
    "contenedores, contenedores marítimos, containers, alquiler de contenedores, proyectos",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <LanguageProvider>
          <Navbar />

          <main className="page-transition">
            {children}
          </main>

          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
