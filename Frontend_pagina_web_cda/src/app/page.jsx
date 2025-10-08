import React, { Children } from 'react'
import NavbarContainer from "@/components/NavbarContainers";
import Banners from "@/components/Banners";

export default function Home() {
  return (
    <div>
      <Banners/>
      <NavbarContainer/>
      <h1>Página pricipal</h1>
    </div>
  )
}
