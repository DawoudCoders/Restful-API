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

  test("status 404: if article non existant", () => {
    return request(app)
      .patch("/api/article/9999")
      .send({ inc_votes: "12" })
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
              name: "jonny",
              avatar_url:
                "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
            },
            {
              username: "icellusedkars",
              name: "sam",
              avatar_url:
                "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
            },
            {
              username: "rogersop",
              name: "paul",
              avatar_url:
                "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
            },
            {
              username: "lurker",
              name: "do_nothing",
              avatar_url:
                "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            },
          ],
        });
        body.users.forEach((object) => {
          expect(object).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
            })
          );
        });
      });
  });
});

describe.only("GET /api/articles", () => {
  test("Status 200: return with array of objects ommiting the article body & should be sorted in descending order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles.length).toBe(12);

        body.articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              title: expect.any(String),
              topic: expect.any(String),
              author: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_id: expect.any(Number),
            })
          );
        });
        expect(body.articles).toEqual([
          {
            author: "icellusedkars",
            title: "Z",
            article_id: 7,
            topic: "mitch",
            created_at: "2020-01-07T14:08:00.000Z",
            votes: 0,
          },
          {
            author: "icellusedkars",
            title: "Am I a cat?",
            article_id: 11,
            topic: "mitch",
            created_at: "2020-01-15T22:21:00.000Z",
            votes: 0,
          },
          {
            author: "icellusedkars",
            title: "Does Mitch predate civilisation?",
            article_id: 8,
            topic: "mitch",
            created_at: "2020-04-17T01:08:00.000Z",
            votes: 0,
          },
          {
            author: "rogersop",
            title: "Student SUES Mitch!",
            article_id: 4,
            topic: "mitch",
            created_at: "2020-05-06T01:14:00.000Z",
            votes: 0,
          },
          {
            author: "rogersop",
            title: "Seven inspirational thought leaders from Manchester UK",
            article_id: 10,
            topic: "mitch",
            created_at: "2020-05-14T04:15:00.000Z",
            votes: 0,
          },
          {
            author: "butter_bridge",
            title: "They're not exactly dogs, are they?",
            article_id: 9,
            topic: "mitch",
            created_at: "2020-06-06T09:10:00.000Z",
            votes: 0,
          },
          {
            author: "butter_bridge",
            title: "Living in the shadow of a great man",
            article_id: 1,
            topic: "mitch",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 100,
          },
          {
            author: "rogersop",
            title: "UNCOVERED: catspiracy to bring down democracy",
            article_id: 5,
            topic: "cats",
            created_at: "2020-08-03T13:14:00.000Z",
            votes: 0,
          },
          {
            author: "butter_bridge",
            title: "Moustache",
            article_id: 12,
            topic: "mitch",
            created_at: "2020-10-11T11:24:00.000Z",
            votes: 0,
          },
          {
            author: "icellusedkars",
            title: "Sony Vaio; or, The Laptop",
            article_id: 2,
            topic: "mitch",
            created_at: "2020-10-16T05:03:00.000Z",
            votes: 0,
          },
          {
            author: "icellusedkars",
            title: "A",
            article_id: 6,
            topic: "mitch",
            created_at: "2020-10-18T01:00:00.000Z",
            votes: 0,
          },
          {
            author: "icellusedkars",
            title: "Eight pug gifs that remind me of mitch",
            article_id: 3,
            topic: "mitch",
            created_at: "2020-11-03T09:12:00.000Z",
            votes: 0,
          },
        ]);
      });
  });
  //badPath no 400 or 404 only path not found error
});
