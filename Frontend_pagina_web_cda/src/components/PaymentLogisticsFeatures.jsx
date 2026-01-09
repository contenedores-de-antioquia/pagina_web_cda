"use client";

import Image from "next/image";
import "./paymentLogisticsFeatures.css";

export default function PaymentLogisticsFeatures() {
  return (
    <section className="featuresSection">
      <div className="featuresGrid">

        {/* ITEM 1 */}
        <div className="featureItem">
          <Image
            src="/img/Metodos-de-pago-Contenedores-de-Antioquia.png"
            alt="Métodos de pago"
            width={80}
            height={80}
            className="featureIcon"
          />
          <h3>Paga con tarjeta o en efectivo</h3>
          <p>
            Paga tu proyecto de forma fácil y segura. 
            Aceptamos efectivo, transferencias desde cualquier
            banco, Mercado Pago y pagos a través de PSE con tu 
            entidad bancaria. Todos nuestros medios de pago son 
            100% seguros, confiables y respaldados, para que tengas 
            total tranquilidad al invertir en tu proyecto.
          </p>
        </div>

        {/* ITEM 2 */}
        <div className="featureItem">
          <Image
            src="/img/Servicio-Logistico-Contenedores-de-Antioquia.png"
            alt="Servicio logístico"
            width={80}
            height={80}
            className="featureIcon"
          />
          <h3>Servicio logístico para tu proyecto</h3>
          <p>
            Llevamos tu proyecto a cualquier destino en Colombia. Contamos con
            todos los certificados y permisos requeridos para el transporte y la
            operación logística, garantizando una entrega segura, puntual y sin
            contratiempos.
          </p>
        </div>

        {/* ITEM 3 */}
        <div className="featureItem">
          <Image
            src="/img/Mantenimiento-y-garantia.png"
            alt="Mantenimiento y garantía"
            width={80}
            height={80}
            className="featureIcon"
          />
          <h3>Mantenimiento y garantía</h3>
          <p>
            Respaldamos cada uno de nuestros proyectos con garantía y
            acompañamiento postventa. Nos encargamos del mantenimiento necesario
            para asegurar la durabilidad, funcionalidad y buen estado de tu
            proyecto en el tiempo.
          </p>
        </div>

      </div>
    </section>
  );
}
