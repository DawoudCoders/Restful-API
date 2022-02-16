const {
  fetchTopics,
  fetchArticleById,
  patchArticleModel,
  fetchUsers,
  fetchArticles,
} = require("../models");

exports.getTopics = (req, res, next) => {
  fetchTopics().then((response) => {
    res.status(200).send({ topics: response });
  });
};

exports.getArticleById = (req, res, next) => {
  fetchArticleById(req.params)
    .then((response) => {
      res.status(200).send({ articleByID: response[0] });
    })
    .catch(next);
};

exports.patchArticle = (req, res, next) => {
  patchArticleModel(req.body, req.params)
    .then((response) => {
      res.status(200).send({ updatedArticle: response });
    })
    .catch(next);
};

exports.getUsers = (req, res, next) => {
  fetchUsers().then((response) => {
    res.status(200).send({ users: response });
  });
};

exports.getArticles = (req, res, next) => {
  fetchArticles().then((response) => {
    res.status(200).send({ articles: response });
  });
};
