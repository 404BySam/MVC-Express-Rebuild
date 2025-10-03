const Article = require("../models/articleModel");
let nextId = 4; // Prochain ID à utiliser

function getNextId() {
  return nextId++;
}

// Données simulées en mémoire
let articles = [
  { id: 1, title: "Premier article", content: "Ceci est mon premier article." },
  { id: 2, title: "Deuxième article", content: "Encore un peu de contenu." },
  { id: 3, title: "Troisième article", content: "Le troisième est le bon !" },
];

// --- CRUD basique ---
function findAll() {
  return articles;
}

function findById(id) {
  return articles.find((a) => a.id === id) || null;
}

function create({ title, content }) {
  const newArticle = { id: getNextId(), title, content };
  articles.push(newArticle);
  return newArticle;
}

function patch(id, data) {
  const art = findById(id);
  if (!art) return null;

  const { title, content } = data;
  if (title !== undefined) art.title = title;
  if (content !== undefined) art.content = content;

  return art;
}

function remove(id) {
  const idx = articles.findIndex((a) => a.id === id);
  if (idx === -1) return false;
  articles.splice(idx, 1);
  return true;
}

module.exports = {
  findAll,
  findById,
  create,
  patch,
  remove,
};
