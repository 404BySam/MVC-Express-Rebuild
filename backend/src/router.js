const express = require("express");
const router = express.Router();
const ArticleCtrl = require("./controllers/articleController");

// Route d’accueil (texte simple)
router.get("/", (req, res) => {
  res.send("Bienvenue dans le backend !");
});

// Articles (API REST)
router.get("/api/articles", ArticleCtrl.getAll);
router.get("/api/articles/:id", ArticleCtrl.getById);
router.post("/api/articles", ArticleCtrl.create);
router.patch("/api/articles/:id", ArticleCtrl.patch);
router.delete("/api/articles/:id", ArticleCtrl.remove);

module.exports = router;

module.exports = router;
