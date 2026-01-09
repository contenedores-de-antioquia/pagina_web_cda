import NavbarContainer from "../components/NavbarContainers";
import Banners from "../components/Banners";
import ProjectsCarousel from "../components/ProjectsCarousel";
import ClientLogosCarousel from "../components/ClientLogosCarousel";
import FornitureShowcase from "../components/FurnitureShowcase";
import FeaturedProducts from "../components/FeaturedProducts";
import AboutUs from "../components/AboutUs";
import PaymentLogisticsFeatures from "../components/PaymentLogisticsFeatures";
import OtherServices from "../components/OtherServices";

export default function Home() {
  return (
    <div>
      <NavbarContainer />
      <Banners />
      <ProjectsCarousel />
      <FeaturedProducts />
      <FornitureShowcase />
      <OtherServices/>
      <AboutUs/>
      <ClientLogosCarousel />
      <PaymentLogisticsFeatures/>
      
    </div>
  );
}
