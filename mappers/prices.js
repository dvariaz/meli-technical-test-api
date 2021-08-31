/**
 * Function to calculate the price for the required format
 *
 * @param {*} currentPrice
 * @param {*} currency
 * @returns
 */
const mapPrice = (currentPrice, currency) => {
  let [integer, decimals] = String(currentPrice).split(".");

  integer = parseInt(integer);
  decimals = decimals !== undefined ? parseInt(decimals) : 0;

  return {
    currency,
    amount: integer,
    decimals: decimals,
  };
};

module.exports = { mapPrice };
