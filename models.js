const { query } = require("./db/connection");
const db = require("./db/connection");

exports.fetchTopics = () => {
  console.log("in models");
  return db.query("SELECT * FROM topics").then((response) => {
    console.log("here");
    return response;
  });
};
