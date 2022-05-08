const credentialService = require("../src/services/credentials.service");
const tokenService = require("../src/services/token.service");

describe("The credentials service", () => {
  test("It can generate a client ID and a client secret for a new user.", () => {
    const secret = credentialService.generateSecret();
    const clientId = credentialService.generateClientId();

    expect(typeof secret).toBe("string");
    expect(typeof clientId).toBe("string");
  }); 

  test("The clientId and clientSecret are both reasonably long.", () => {
    const secret = credentialService.generateSecret();
    const clientId = credentialService.generateClientId();
    expect(secret.length > 32).toBe(true);
    expect(clientId.length > 32).toBe(true);
  });

  test("The client ID and client secret can be used to generate an access token.", () => {
    const clientSecret = credentialService.generateSecret();
    const clientId = credentialService.generateClientId();

    const token = tokenService.generateToken({ clientId, clientSecret });
    expect(() => {
      tokenService.validateToken(token, clientSecret);
    }).not.toThrowError();
  });
}); 