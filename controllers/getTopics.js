const { fetchTopics } = require("../Models/fetchTopics");

exports.getTopics = (req, res, next) => {
  fetchTopics().then((response) => {
    res.status(200).send({ topics: response });
  });
};
