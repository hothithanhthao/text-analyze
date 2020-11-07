const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
    it('page should return API is running!', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual('API is running!');
    });
});

describe("GET /get_texts", () => {
    test("It responds with an array of texts", async () => {
        const res = await request(app).get("/get_texts");
        expect(res.body.length).toBe(1);
        expect(res.body[0]).toHaveProperty("textLength");
        expect(res.body[0]).toHaveProperty("wordCount");
        expect(res.body[0]).toHaveProperty("characterCount");
        expect(res.body[0].wordCount).toBe(3);
        expect(res.statusCode).toBe(200);
    });
});

describe("POST /new_text", () => {
    test("It should respond with text object", async () => {
        const newText = await request(app)
            .post("/new_text")
            .send({
                text: "hello 2 times  "
            });
        expect(newText.body.result.wordCount).toBe(3);
        expect(newText.body.result.textLength).toHaveProperty("withSpaces");
        expect(newText.body.result.characterCount[0]).toEqual({"e":2,"h":1,"i":1,"l":2,"m":1,"o":1,"s":1,"t":1});
        expect(newText.statusCode).toBe(200);
  
      // make sure we have 2 texts
      const res = await request(app).get("/get_texts");
      expect(res.body.length).toBe(2);
    });
});

describe("Test a 404", () => {
    test("It should respond with a 404 status", async () => {
        const res = await request(app).get("/nowhere");
        expect(res.statusCode).toBe(404);
    });
});