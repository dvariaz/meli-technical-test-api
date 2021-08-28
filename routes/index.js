var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  return res.status(200).json({
    message: `API Running on env: ${req.app.get("env")}`,
  });
});

module.exports = router;
