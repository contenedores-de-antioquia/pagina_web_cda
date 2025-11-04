import React, { Children } from 'react'
import NavbarContainer from "@/components/NavbarContainers";
import Banners from "@/components/Banners";


export default function Home() {
  return (
    <div>
      
      <NavbarContainer/>
      <Banners/>
      <h1>Página pricipal</h1>
    </div>
  )
}
