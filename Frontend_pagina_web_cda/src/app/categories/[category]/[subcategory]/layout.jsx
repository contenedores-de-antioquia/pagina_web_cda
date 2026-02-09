import React from "react";
import NadvarContainers from "@/components/NavbarContainers";
import Breadcrumb from "@/components/Breadcrumb"; // agregado import correcto
import CategoryContainerMenu from "@/components/CategoryConteiner";

export default function ContainersLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}