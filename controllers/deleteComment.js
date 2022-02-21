const { deleteCommentModel } = require("../Models/deleteCommentModel");

exports.deleteComment = (req, res, next) => {
  deleteCommentModel(req.params)
    .then(() => {
      res.status(204).send("");
    })
    .catch(next);
};
