const db = require("../db/connection");
const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");

describe("pathFindingError", () => {
  test("Should return 404 if path not found ", () => {
    return request(app)
      .get("/api/notapath")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Path not found");
      });
  });
});
