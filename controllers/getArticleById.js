const { fetchArticleById } = require("../Models/fetchArticleByID");

exports.getArticleById = (req, res, next) => {
 
  fetchArticleById(req.params)
    .then((response) => {
      res.status(200).send({ article: response[0] });
    })
    .catch((err) => {
      next(err);
    });
};
