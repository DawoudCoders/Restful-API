const express = require("express");
const app = express();
const {
  getTopics,
  getArticleById,
  patchArticle,
  getUsers,
  getArticles,
} = require("./controllers/controllers");
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


/* app.use((err, req, res, next) => {
  console.log(err);
  res.status(404).send("article id not valid");
}); */

module.exports = app;
