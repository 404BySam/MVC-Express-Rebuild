const express = require("express");
const router = require("./router");

const app = express();

// middlewares de base
app.use(express.json());

// On branche notre router sur la racine
app.use("/", router);

module.exports = app;
