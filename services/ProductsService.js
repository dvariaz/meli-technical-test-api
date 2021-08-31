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
  try {
    const url = `${process.env.PRODUCTS_API_URL}/sites/MLA/search?q=${query}`;

    const response = await fetch(url);
    const { message, results, filters } = await response.json();

    if (!response.ok) throw new Error(message);

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
  } catch (err) {
    console.error(err);
    throw new Error(`Error searching products by query: ${query}`);
  }
};

/**
 * Service to get detailed information of a product
 *
 * @param {*} id
 * @returns
 */
const getProductById = async (id) => {
  try {
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
  } catch (err) {
    console.error(err);
    throw new Error(`Error searching product by id: ${id}`);
  }
};

module.exports = {
  searchProductsByQuery,
  getProductById,
};
