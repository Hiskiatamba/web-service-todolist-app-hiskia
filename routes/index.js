const express = require("express");
const route = express.Router();

route.get("/", (req, res) => {
  res.json({
    message: "This is Bradley's Todo Endpoint"
  })
});

module.exports = route;