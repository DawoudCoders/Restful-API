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

describe("PATCH /api/articles/:article_id ", () => {
  test("Status 200 : responds with status 200 ", () => {
    return request(app)
      .patch("/api/article/3")
      .send({ inc_votes: 1 })
      .expect(200);
  });
  test("Status 200 : responds with an object of the updated article ", () => {
    return request(app)
      .patch("/api/article/3")
      .send({ inc_votes: 1 })
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({
          updatedArticle: {
            article_id: 3,
            title: "Eight pug gifs that remind me of mitch",
            topic: "mitch",
            author: "icellusedkars",
            body: "some gifs",
            created_at: "2020-11-03T09:12:00.000Z",
            votes: 1,
          },
        });
      });
  });
  test("Status 200 : responds with an object of the updated article -- SECOND TEST ", () => {
    return request(app)
      .patch("/api/article/3")
      .send({ inc_votes: -15 })
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({
          updatedArticle: {
            article_id: 3,
            title: "Eight pug gifs that remind me of mitch",
            topic: "mitch",
            author: "icellusedkars",
            body: "some gifs",
            created_at: "2020-11-03T09:12:00.000Z",
            votes: -15,
          },
        });
      });
  });
  //bad path
  test("status 400: respond with status 400 for invalid update request i.e inc_votes: aaa", () => {
    return request(app)
      .patch("/api/article/3")
      .send({ inc_votes: "aaa" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid input type");
      });
  });
  //IS THIS NEEDED HERE?
  test("status 404: if article non existant", () => {
    return request(app)
      .get("/api/article/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article not found");
      });
  });
});

describe("GET /api/users", () => {
  test("status 200: should respond with object of array of objects", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        console.log(body);
        expect(body.users.length).toBe(4);
        console.log(body);
        expect(body).toEqual({
          users: [
            {
              username: "butter_bridge",
            },
            {
              username: "icellusedkars",
            },
            {
              username: "rogersop",
            },
            {
              username: "lurker",
            },
          ],
        });
        body.users.forEach((object) => {
          expect(object).toEqual(
            expect.objectContaining({
              username: expect.any(String),
            })
          );
        });
      });
  });
});
