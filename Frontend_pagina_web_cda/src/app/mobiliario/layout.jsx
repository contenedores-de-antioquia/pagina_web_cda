import NavbarForniture from "@/components/NavbarForniture";
import { title } from "process";

export default function ContainersLayout({ children }) {
  return (
    <>
      <NavbarForniture />
      {children}
    </>
  );
}