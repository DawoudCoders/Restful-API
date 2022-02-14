const { fetchTopics, fetchArticleById } = require("../models");

exports.getTopics = (req, res, next) => {
  fetchTopics().then((response) => {
    res.status(200).send({ topics: response });
  });
};

exports.getArticleById = (req, res, next) => {
  fetchArticleById(req.params)
    .then((response) => {
      res.status(200).send({ articleByID: response });
    })
    .catch(next);
};
