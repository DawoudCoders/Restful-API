exports.pathFindingError = (req, res) => {
  res.status(404).send({ msg: "Path not found" });
};

exports.handle400s = (err, req, res, next) => {
  if (err.code == "22P02") res.status(400).send({ msg: "invalid input type" });
  else if (err.code == "23502")
    res.status(400).send({ msg: "invalid input type / Missing arguments" });
  else next(err);
};

exports.handle404 = (err, req, res, next) => {
  if (err.status == 404) res.status(404).send({ msg: "Article not found" });
  else next(err);
};
exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: "Bad Request" });
  }
  else next(err);
};

exports.handleOtherErrors = (err, req, res, next) => {
  console.log(err);
};
