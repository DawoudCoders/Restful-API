const { fetchArticles } = require("../Models/fetchArticles");

exports.getArticles = (req, res, next) => {
  const { sort_by, order, topic } = req.query;
 
  fetchArticles(sort_by, order, topic)
    .then((response) => {
      res.status(200).send({ articles: response });
    })
    .catch((err) => {
      next(err);
    });
};
