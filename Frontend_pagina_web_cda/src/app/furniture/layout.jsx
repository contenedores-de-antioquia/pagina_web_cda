import React from "react";
import NavbarContainers from "@/components/NavbarContainers";
import Breadcrumb from "@/components/Breadcrumb";
import FornitureShowcase from "@/components/FurnitureShowcase";

export default function ContainersLayout({ children }) {
  return (
    <>
      <NavbarContainers />
      <Breadcrumb />
      {children}

      {/* Ahora no se verá título ni subtítulo */}
      <FornitureShowcase hideTitles />
    </>
  );
}
