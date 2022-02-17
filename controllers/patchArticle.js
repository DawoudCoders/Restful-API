const { patchArticleModel } = require("../Models/patchArticleModel");

exports.patchArticle = (req, res, next) => {
    patchArticleModel(req.body, req.params)
      .then((response) => {
        res.status(200).send({ updatedArticle: response });
      })
      .catch(next);
  };