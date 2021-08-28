const fetch = require("node-fetch");

// Utils
const { extractCategories, extractItems } = require("../utils/search");

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

  const categories = extractCategories(
    filters.filter((filter) => filter.id === "category")
  );
  const items = extractItems(results);

  return {
    author: {
      name: "Author Name",
      lastname: "Author Lastname",
    },
    categories,
    items,
  };
};

const getProductById = async (id) => {};

module.exports = {
  searchProductsByQuery,
  getProductById,
};
