const app = require("../../src/apis/decision.api");
const request = require("supertest");
const tokenService = require("../../src/services/api/token.service");
const evalApiError = require("../boilerplates/apiError");

describe("The POST tree API", () => {

  const token = tokenService.generateToken({
    clientId: "thesupertestclientid",
    clientSecret: "the_gauls_are_coming" // temporarily, pending a linked db 
  });
  
  test("The route requires authentication.", async () => {
    const response = await request(app).post("/trees");
    expect(response.statusCode).toBe(401);
    const { body } = response;
    evalApiError(body, { expectedCode: "NO_AUTH_HEADER" });

    const authedResponse = await request(app).post("/trees")
      .set({ "Authorization": `Bearer ${token}` });
    expect(authedResponse.statusCode).toBe(400); // indicating auth success, even though there's route failure. 

  });

  test("The route requires a JSON body with a tree property", async () => {
    const response = await request(app).post("/trees").set({ "Authorization": `Bearer ${token}` });
    expect(response.statusCode).toBe(400);
    const { body } = response;
    evalApiError(body, { expectedCode: "NO_TREE" });
  });

  test("The tree property is an array of Node JSON.", async () => {
    const response = await request(app).post("/trees")
      .set({ "Authorization": `Bearer ${token}` })
      .send({ tree: [] });
    expect(response.statusCode).toBe(400);
    const { body } = response;
    evalApiError(body, { expectedCode: "INVALID_NODES" });
  });

  test("Sending a tree with an invalid node results in an error on the node itself.", async () => {

  });

  // here's a bloody reach goal for sure. 
  test("The request fails if any node in the tree canoot possibly be evaluated.", async () => {

  });

  test("A successful request replies with a tree ID and a list of required context variables.", async () => {

  });


})