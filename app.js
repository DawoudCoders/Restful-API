const express = require("express");
const app = express();
const { getTopics } = require("./controllers");
const { pathFindingError } = require("./errorHandling.controllers");

app.use(express.json());

app.get("/api/topics", getTopics);

app.all("/*", pathFindingError);

module.exports = app;
