const { mapPrice } = require("../../mappers/prices");

describe("Price mapper", () => {
  test("Should return the price in expected schema", () => {
    const schema = {
      type: "object",
      properties: {
        currency: { type: "string" },
        amount: { type: "number" },
        decimals: { type: "number" },
      },
    };

    const mappedPrice = mapPrice(1255.99, "ARS");

    expect(mappedPrice).toMatchSchema(schema);
  });

  test("Should return decimals in zero when the price doesn't have decimals", () => {
    expect(mapPrice(950, "USD")).toEqual({
      currency: "USD",
      amount: 950,
      decimals: 0,
    });
  });
});
