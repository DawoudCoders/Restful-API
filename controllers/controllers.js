const { fetchTopics } = require("../models");

exports.getTopics = (req, res, next) => {
  console.log("in controller");
  fetchTopics().then((response) => {
    res.status(200).send({ topics: response });
  });
};
