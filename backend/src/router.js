const express = require("express");
const router = express.Router();

// Données simulées en mémoire
let articles = [
  { id: 1, title: "Premier article", content: "Ceci est mon premier article." },
  { id: 2, title: "Deuxième article", content: "Encore un peu de contenu." },
  { id: 3, title: "Troisième article", content: "Le troisième est le bon !" },
];

// Route racine : renvoie un message simple
router.get("/", (req, res) => {
  res.send("Bienvenue dans le backend !");
});

// GET /api/articles - renvoie la liste des articles
router.get("/api/articles", (req, res) => {
  res.json(articles);
});

// GET /api/articles/:id - renvoie un article par son id
router.get("/api/articles/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const article = articles.find((a) => a.id === id);

  if (article) {
    res.json(article);
  } else {
    res.status(404).json({ message: "Article non trouvé" });
  }
});

// POST /api/articles - ajoute un article
router.post("/api/articles", (req, res) => {
  const { title, content } = req.body;

  // Validation très simple
  if (!title || !content) {
    return res.status(400).json({ message: "Titre et contenu obligatoires" });
  }

  // Créer un nouvel article
  const newArticle = {
    id: articles.length + 1,
    title,
    content,
  };

  articles.push(newArticle);

  res.status(201).json(newArticle); // 201 = "Created"
});

// PATCH /api/articles/:id — modification partielle (title et/ou content)
router.patch("/api/articles/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return res.status(404).json({ message: "Article non trouvé" });
  }

  const { title, content } = req.body;

  // Si aucun champ envoyé, on considère la requête invalide
  if (title === undefined && content === undefined) {
    return res
      .status(400)
      .json({ message: "Rien à modifier (title ou content attendu)" });
  }

  if (title !== undefined) article.title = title;
  if (content !== undefined) article.content = content;

  return res.json(article); // 200 OK
});

// DELETE /api/articles/:id — suppression
router.delete("/api/articles/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = articles.findIndex((a) => a.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Article non trouvé" });
  }

  const destroy = (req, res) => {
    const { id } = req.params;
    models.article
      .delete(id)
      .then(([result]) => {
        if (result.affectedRows === 0) res.sendStatus(404);
        else res.sendStatus(204);
      })
      .catch((error) => {
        console.error(error);
        res.sendStatus(500);
      });
  };

  // On retire l'élément du tableau
  articles.splice(index, 1);

  return res.status(204).send(); // 204 No Content
});

module.exports = router;
