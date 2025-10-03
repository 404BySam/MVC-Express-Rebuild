const Article = require("../models/articleModel");

// GET /api/articles
async function getAll(req, res) {
  const data = Article.findAll();
  res.json(data);
}

// GET /api/articles/:id
async function getById(req, res) {
  const id = parseInt(req.params.id, 10);
  const article = Article.findById(id);
  if (!article) return res.status(404).json({ message: "Article non trouvé" });
  return res.json(article);
}

// POST /api/articles
async function create(req, res) {
  const { title, content } = req.body;
  if (!title || !content)
    return res.status(400).json({ message: "Titre et contenu obligatoires" });

  const created = Article.create({ title, content });
  return res.status(201).json(created);
}

// PATCH /api/articles/:id
async function patch(req, res) {
  const id = parseInt(req.params.id, 10);
  const hasNoFields =
    req.body.title === undefined && req.body.content === undefined;
  if (hasNoFields) {
    return res
      .status(400)
      .json({ message: "Rien à modifier (title ou content attendu)" });
  }

  const updated = Article.patch(id, req.body);
  if (!updated) return res.status(404).json({ message: "Article non trouvé" });
  return res.json(updated);
}

// DELETE /api/articles/:id
async function remove(req, res) {
  const id = parseInt(req.params.id, 10);
  const ok = Article.remove(id);
  if (!ok) return res.status(404).json({ message: "Article non trouvé" });
  return res.status(204).send();
}

module.exports = {
  getAll,
  getById,
  create,
  patch,
  remove,
};
