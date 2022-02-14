const express = require("express");
const app = express();
const { getTopics, getArticleById } = require("./controllers/controllers");
const { pathFindingError } = require("./controllers/errorHandling.controllers");

app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/article/:id", getArticleById);

app.all("/*", pathFindingError);

module.exports = app;
