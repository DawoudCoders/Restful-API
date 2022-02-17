const { fetchUsers } = require("../Models/fetchUsers");

exports.getUsers = (req, res, next) => {
  fetchUsers().then((response) => {
    res.status(200).send({ users: response });
  });
};
