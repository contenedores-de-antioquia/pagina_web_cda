import NavbarContainer from "@/components/NavbarContainers";
import Breadcrumb from "@/components/Breadcrumb";
import FeaturedProducts from "@/components/FeaturedProducts";

export default function ContainersLayout({ children }) {
  return (
    <>
      <NavbarContainer />
      <Breadcrumb />
      {children}
      <FeaturedProducts/>
    </>
  );
}


