const express = require("express");
const app = express();

const { getTopics } = require("./controllers/getTopics");
const { getArticleById } = require("./controllers/getArticleById");
const { patchArticle } = require("./controllers/patchArticle");
const { getUsers } = require("./controllers/getUsers");
const { getArticles } = require("./controllers/getArticles");
const { getComments } = require("./controllers/getComments");
const { postComment } = require("./controllers/postComment.js");
const { deleteComment } = require("./controllers/deleteComment.js");

const {
  pathFindingError,
  handle400s,
  handle404,
  handleCustomErrors,
  handleOtherErrors,
} = require("./controllers/errorHandling.controllers");

app.use(express.json());

app.get("/api/topics", getTopics);     //------
app.get("/api/article/:id", getArticleById);
app.get("/api/users", getUsers);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id/comments", getComments);

app.patch("/api/article/:id", patchArticle);

app.post("/api/articles/:id/comments", postComment);

app.delete("/api/comments/:comment_id", deleteComment);

app.all("/*", pathFindingError);

app.use(handle400s);
app.use(handle404);
app.use(handleCustomErrors);
app.use(handleOtherErrors);

module.exports = app;
