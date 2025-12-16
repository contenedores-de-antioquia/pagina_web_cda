// src/app/furniture/layout.jsx

import React from "react";
import NadvarContainers from "@/components/NavbarContainers";
import Breadcrumb from "@/components/Breadcrumb"; // agregado import correcto

export default function ContainersLayout({ children }) {
  return (
    <>
      <Breadcrumb />
      <NadvarContainers/>
      {children}
    </>
  );
}
