const express = require("express");
const router = express.Router();

// Route racine : renvoie un message simple
router.get("/", (req, res) => {
  res.send("Bienvenue dans le backend !");
});

module.exports = router;
