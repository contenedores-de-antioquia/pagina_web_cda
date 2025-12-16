import NavbarContainer from "@/components/NavbarContainers";
import Banners from "@/components/Banners";
import ProjectsCarousel from "../components/ProjectsCarousel";
import ClientLogosCarousel from "../components/ClientLogosCarousel";
import FornitureShowcase from "../components/FurnitureShowcase";
import FeaturedProducts from "../components/FeaturedProducts";

export default function Home() {
  return (
    <div>
      <Banners />
      <NavbarContainer />
      <FeaturedProducts />
      <ProjectsCarousel />
      <FornitureShowcase />
      <ClientLogosCarousel />
    </div>
  );
}
