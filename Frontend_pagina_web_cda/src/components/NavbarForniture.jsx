import Link from "next/link";

export default function Navbar(){
    return (
        <nav>
            <ul>
                <li>
                     <Link href="\mobiliario\puesto-de-trabajo">Puesto de trabajo</Link>
                </li>
                <li>
                     <Link href="\mobiliario\mesa-de-reuniones">Mesa de Reuniones</Link>
                </li>
                <li>
                    <Link href="\mobiliario\escritorio-home">Escritorio Home</Link>
                </li>
                <li>
                     <Link href="\mobiliario\comedor">Comedor</Link>
                </li>
                <li>
                    <Link href="\mobiliario\repisa-de-pared">Repisa de pared</Link>
                </li>
                <li>
                    <Link href="\mobiliario\repisa-para-division-biblioteca"> Repisa para división / Biblioteca</Link>
                </li>
            </ul>
        </nav>
    );
}