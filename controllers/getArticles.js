const { fetchArticles } = require("../Models/fetchArticles");

exports.getArticles = (req, res, next) => {

  const { sort_by, order } = req.query;
  fetchArticles(sort_by, order)
    .then((response) => {
      res.status(200).send({ articles: response });
    })
    .catch((err) => {
      next(err);
    });
};
