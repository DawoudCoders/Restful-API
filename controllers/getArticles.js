const { fetchArticles } = require("../Models/fetchArticles");

exports.getArticles = (req, res, next) => {
  fetchArticles().then((response) => {
    res.status(200).send({ articles: response });
  });
};
