import NavbarContainer from "@/components/NavbarContainers";
import { title } from "process";

export default function ContainersLayout({ children }) {
  return (
    <>
      <NavbarContainer />
      {children}
    </>
  );
}