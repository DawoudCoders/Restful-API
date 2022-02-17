const express = require("express");
const app = express();

const { getTopics } = require("./controllers/getTopics");
const { getArticleById } = require("./controllers/getArticleById");
const { patchArticle } = require("./controllers/patchArticle");
const { getUsers } = require("./controllers/getUsers");
const { getArticles } = require("./controllers/getArticles");

const {
  pathFindingError,
  handle400s,
} = require("./controllers/errorHandling.controllers");

app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/article/:id", getArticleById);
app.get("/api/users", getUsers);
app.get("/api/articles", getArticles);

app.patch("/api/article/:id", patchArticle);

app.all("/*", pathFindingError);

//custom handling error - article id not valid
app.use(handle400s);

module.exports = app;
