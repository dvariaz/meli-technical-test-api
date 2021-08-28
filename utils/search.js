// Utils
const { calculatePrice } = require("../utils/prices");

/**
 * Function to extract categories from query result
 *
 * @param {*} category
 * @returns
 */
const extractCategories = ({ values }) => {
  const categories = values.map(({ path_from_root }) => {
    return path_from_root.map((category) => category.name);
  });

  return categories;
};

/**
 * Function to extract items from a query result
 *
 * @param {*} results
 * @returns
 */
const extractItems = (results) => {
  const items = results.map((result) => {
    const { id, title, price, currency_id, thumbnail, condition, shipping } =
      result;

    return {
      id,
      title,
      price: calculatePrice(price, currency_id),
      picture: thumbnail,
      condition,
      free_shipping: shipping.free_shipping,
    };
  });

  return items;
};

module.exports = { extractCategories, extractItems };
