import "./categoryConteiner.css";
export default function CategoryContainers() {
  return (
    <section className="containersCategory">
      {/* Nombre de la categoría */}
      <h1 className="nameCategory">Nombre de categoría</h1>

      {/* Subcategorías de contenedores */}
      <ul className="subCategory">
        <li><h2>10 pies</h2></li>
        <li><h2>20 pies</h2></li>
        <li><h2>40 pies</h2></li>
      </ul>
    </section>
  );
}
