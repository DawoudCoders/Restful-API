const { fetchUserByID } = require("../Models/fetchUserByID");

exports.getUserByID = (req, res, next) => {
  fetchUserByID(req.params)
    .then((response) => {
      res.status(200).send({ user: response });
    })
    .catch((err) => {
      next(err);
    });
};
