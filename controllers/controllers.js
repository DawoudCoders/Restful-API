const { fetchTopics, fetchArticleById } = require("../models");

exports.getTopics = (req, res, next) => {
  fetchTopics().then((response) => {
    res.status(200).send({ topics: response });
  });
};

exports.getArticleById = (req, res, next) => {
  fetchArticleById(req.params)
    .then((response) => {
      console.log({ articleByID: response[0] });
      res.status(200).send({ articleByID: response[0] });
    })
    .catch(next);
};
