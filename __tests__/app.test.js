const db = require("../db/connection");
const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("Get api/topics", () => {
  test("Should return with an array of length 3 ", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        body.length;
        expect(body.topics.rows.length).toBe(3);
      });
  });
  test("Should return with an array of object, all of which have a slug and description key  ", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const topicsArr = body.topics.rows;
        topicsArr.forEach((topic) => {
          expect(topic).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
});

describe("Get specific article ID", () => {
  test("Should respond with only the articles that match the id", () => {
    return request(app)
      .get("/api/article/3")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({
          articleByID: {
            title: "Eight pug gifs that remind me of mitch",
            topic: "mitch",
            author: "icellusedkars",
            body: "some gifs",
            created_at: "2020-11-03T09:12:00.000Z",
            votes: 0,
            article_id: 3,
          },
        });
      });
  });
  test("Should return article not found if id not valid ", () => {
    return request(app)
      .get("/api/article/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article not found");
      });
  });
});
