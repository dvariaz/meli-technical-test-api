const fetch = require("node-fetch");

// Utils
const {
  mapCategories,
  mapProducts,
  mapProductDetails,
} = require("../mappers/search");

/**
 * Service to search products by a given query
 *
 * @param {*} query
 * @returns
 */
const searchProductsByQuery = async (query) => {
  const url = `${process.env.PRODUCTS_API_URL}/sites/MLA/search?q=${query}`;

  const response = await fetch(url);
  const { results, filters } = await response.json();

  const [categories] = filters.filter((filter) => filter.id === "category");
  const items = mapProducts(results);

  return {
    author: {
      name: "Author Name",
      lastname: "Author Lastname",
    },
    categories: mapCategories(categories),
    items,
  };
};

/**
 * Service to get detailed information of a product
 *
 * @param {*} id
 * @returns
 */
const getProductById = async (id) => {
  const productUrl = `${process.env.PRODUCTS_API_URL}/items/${id}`;
  const descriptionUrl = `${process.env.PRODUCTS_API_URL}/items/${id}/description`;

  const responses = await Promise.all([
    fetch(productUrl),
    fetch(descriptionUrl),
  ]);
  const [productData, descriptionData] = await Promise.all(
    responses.map((response) => response.json())
  );

  return {
    author: {
      name: "Author Name",
      lastname: "Author Lastname",
    },
    item: mapProductDetails({
      ...productData,
      description: descriptionData.plain_text,
    }),
  };
};

module.exports = {
  searchProductsByQuery,
  getProductById,
};
