// Utils
const { mapPrice } = require("../mappers/prices");
const { isEmpty } = require("../utils/data");

/**
 * Function to extract categories from query result
 *
 * @param {*} category
 * @returns
 */
const mapCategories = (filter) => {
  if (isEmpty(filter)) return [];

  const { values } = filter;
  const categories = values
    .map(({ path_from_root }) => {
      return path_from_root.map((category) => category.name);
    })
    .flat();

  return categories;
};

/**
 * Function to extract items from a query result
 *
 * @param {*} results
 * @returns
 */
const mapProducts = (results) => {
  if (isEmpty(results)) return [];

  const items = results.map((result) => {
    const { id, title, price, currency_id, thumbnail, condition, shipping } =
      result;

    return {
      id,
      title,
      price: mapPrice(price, currency_id),
      picture: thumbnail,
      condition,
      free_shipping: shipping.free_shipping,
    };
  });

  return items;
};

/**
 * Function to extract product information from API result
 *
 * @param {*} data
 * @returns
 */
const mapProductDetails = (data) => {
  if (isEmpty(data)) return {};

  const {
    id,
    title,
    price,
    currency_id,
    pictures,
    condition,
    shipping,
    sold_quantity,
    description,
  } = data;

  const [picture] = pictures.map((pictureItem) => pictureItem.url);

  return {
    id,
    title,
    price: mapPrice(price, currency_id),
    picture,
    condition,
    free_shipping: shipping.free_shipping,
    sold_quantity,
    description,
  };
};

module.exports = { mapCategories, mapProductDetails, mapProducts };
