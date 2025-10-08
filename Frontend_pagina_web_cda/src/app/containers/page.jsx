import React from 'react';
import productsData from '../../data/products/products.json';

export async function getStaticPaths() {
  const paths = productsData.map(product => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const product = productsData.find(p => p.id.toString() === params.id);

  return {
    props: {
      product,
    },
  };
}

export default function Product({ product }) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p><strong>Precio:</strong> ${product.price}</p>
      <img src={product.image} alt={product.name} width="400" />
    </div>
  );
}
