const mapped = allData.map((item) => {
  const attrs = item.attributes;

  const imageUrl =
    attrs.projectImages?.data?.[0]?.attributes?.formats?.medium?.url ||
    attrs.projectImages?.data?.[0]?.attributes?.url ||
    null;

  return {
    id: item.id,
    name:
      attrs.projectName ||
      attrs.productName ||
      attrs.fornitureName ||
      "Sin nombre",
    description:
      attrs.projectDescription ||
      attrs.productDescription ||
      attrs.fornitureDescription ||
      "Sin descripción",
    image: imageUrl
      ? process.env.NEXT_PUBLIC_STRAPI_URL + imageUrl
      : null,
  };
});

