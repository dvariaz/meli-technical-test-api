const express = require("express");
const router = express.Router();

//Services
const ProductsService = require("../services/ProductsService");

router.get("/", async (req, res) => {
  try {
    const { q } = req.query;

    const result = await ProductsService.searchProductsByQuery(encodeURI(q));

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductsService.getProductById(id);

    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
