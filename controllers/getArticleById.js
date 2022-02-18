const { fetchArticleById } = require("../Models/fetchArticleByID");

exports.getArticleById = (req, res, next) => {
 
  fetchArticleById(req.params)
    .then((response) => {
      res.status(200).send({ articleByID: response[0] });
    })
    .catch(next);
};
