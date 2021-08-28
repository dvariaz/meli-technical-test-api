const express = require("express");
const router = express.Router();

//Services
const ProductsService = require("../services/ProductsService");

router.get("/", async (req, res) => {
  const { q } = req.query;

  const result = await ProductsService.searchProductsByQuery(encodeURI(q));

  return res.status(200).json(result);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const product = await ProductsService.getProductById(id);

  return res.status(200).json(product);
});

module.exports = router;
