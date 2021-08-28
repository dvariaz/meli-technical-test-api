const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  return res.status(200).json({
    products: [],
  });
});

module.exports = router;
