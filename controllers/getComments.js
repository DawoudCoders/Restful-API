const { fetchComments } = require("../Models/fetchComments");

exports.getComments = (req, res, next) => {

  fetchComments(req.params).then((response) => {
    console.log(response);
    res.status(200).send({ comments: response });
  });
};
