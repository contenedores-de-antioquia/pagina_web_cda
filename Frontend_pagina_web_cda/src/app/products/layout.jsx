import NavbarContainer from "@/components/NavbarContainers";
import Breadcrumb from "@/components/Breadcrumb";

export default function ContainersLayout({ children }) {
  return (
    <>
      <Breadcrumb />
      <NavbarContainer />
      {children}
    </>
  );
}
