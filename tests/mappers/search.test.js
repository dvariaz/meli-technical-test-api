const {
  mapCategories,
  mapProducts,
  mapProductDetails,
} = require("../../mappers/search");

// Mocks
const filterMock = require("../../mocks/filters.mock");
const searchResultsMock = require("../../mocks/search_results.mock");
const productSearchResultMock = require("../../mocks/product_search_result.mock");

describe("Categories mapper tests", () => {
  test("Should return the category in expected schema from filter", () => {
    expect(mapCategories(filterMock)).toEqual([
      "Computación",
      "Tablets y Accesorios",
      "Tablets",
    ]);
  });

  test("Should return the category as empty array from empty filter", () => {
    expect(mapCategories(null)).toEqual([]);
    expect(mapCategories(undefined)).toEqual([]);
    expect(mapCategories({})).toEqual([]);
  });
});

describe("Products mapper tests", () => {
  test("Should return the products in expected schema from search results", () => {
    const schema = {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          price: {
            type: "object",
            properties: {
              currency: { type: "string" },
              amount: { type: "number" },
              decimals: { type: "integer" },
            },
          },
          condition: { type: "string" },
          free_shipping: { type: "boolean" },
        },
        required: ["id", "title", "price", "condition", "free_shipping"],
      },
    };

    const products = mapProducts(searchResultsMock);

    expect(products).toMatchSchema(schema);
  });

  test("Should return products as empty array from empty results", () => {
    expect(mapProducts(null)).toEqual([]);
    expect(mapProducts(undefined)).toEqual([]);
    expect(mapProducts({})).toEqual([]);
  });
});

describe("ProductDetails mapper test", () => {
  test("Should return the product details in expected schema from result", () => {
    const schema = {
      type: "object",
      properties: {
        id: { type: "string" },
        title: { type: "string" },
        price: {
          type: "object",
          properties: {
            currency: { type: "string" },
            amount: { type: "number" },
            decimals: { type: "integer" },
          },
        },
        picture: { type: "string" },
        condition: { type: "string" },
        free_shipping: { type: "boolean" },
        description: { type: "string" },
      },
      required: ["id", "title", "price", "condition", "free_shipping"],
    };

    const product = mapProductDetails(productSearchResultMock);

    expect(product).toMatchSchema(schema);
  });

  test("Should return details as empty object from empty result", () => {
    expect(mapProductDetails(null)).toEqual({});
    expect(mapProductDetails(undefined)).toEqual({});
    expect(mapProductDetails({})).toEqual({});
  });
});
