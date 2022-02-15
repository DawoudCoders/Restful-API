exports.pathFindingError = (req, res) => {
  res.status(404).send({ msg: "Path not found" });
};

exports.handle400s = (err, req, res, next) => {
  if (err.code == "22P02") res.status(400).send({ msg: "invalid input type" });
  if (err.status == 404) res.status(404).send({ msg: "Article not found" });
};
