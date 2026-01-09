"use client";

import NavbarContainer from "@/components/NavbarContainers";
import Breadcrumb from "@/components/Breadcrumb";
import { useLanguage } from "@/context/LanguageContext";

export default function ContainersLayout({ children }) {
  // Se mantiene el hook por si lo necesitas en el layout
  const { language } = useLanguage();

  return (
    <>
      <NavbarContainer />
      
      <div>
        {children}
      </div>
      
    </>
  );
}
