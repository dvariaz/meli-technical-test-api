// Utils
const { calculatePrice } = require("../utils/prices");

const extractCategories = (category) => {
  const {
    values: { path_from_root },
  } = category;

  const categories = path_from_root.map((categoryItem) => categoryItem.name);

  return categories;
};

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
