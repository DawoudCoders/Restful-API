exports.pathFindingError = (req, res) => {
  res.status(404).send({ msg: "Path not found" });
};

exports.handle400s = (err, req, res, next) => {
  if (err.status == 404) res.status(404).send({ msg: "Article not found" });
};
