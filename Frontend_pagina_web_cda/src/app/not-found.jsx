import Link from "next/link";

export default function NotFound(){
    return (
        <section>
             <h1>404</h1>
            <p>Página no encontrada</p>
            <Link href="/"> Volver a página de inicio </Link>
        </section>
    );
}