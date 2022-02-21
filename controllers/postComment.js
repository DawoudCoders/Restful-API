const { postCommentModel } = require("../Models/postCommentModel");

exports.postComment = ( req, res, next) => {
  postCommentModel(req.params, req.body)
    .then((response) => {
      res.status(200).send({ post: response });
    })
    .catch(next);
};
