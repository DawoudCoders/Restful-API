const { fetchComments } = require("../Models/fetchComments");

exports.getComments = (req, res, next) => {
  fetchComments(req.params)
    .then((response) => {
      res.status(200).send({ comments: response });
    })
    .catch(next);
};
