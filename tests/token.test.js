const tokenService = require("../src/services/token.service"); 

describe("The authentication token module", () => {
  test("It requires a data input. This data input is only clientId and clientSecret.", () => {
    
    const data = { 
      clientId: "my_client_id",
      clientSecret: "my_client_secret"
    }

    const badData = {
      clientId: "My_sdla",
      clienSecret: "some-random-bs"
    }

    const moreBadData = { 
      clienID: "MY_BS",
      clientSecret: "Some more bs"
    }

    const yetMoreBadData = {
      NIBS: "YEES"
    }
    
    const token = tokenService.generateToken(data);

    expect(token).not.toBeUndefined();
    
    expect(() => {
      tokenService.generateToken(badData);
    }).toThrow("INVALID_DATA_INPUT");

    expect(() => {
      tokenService.generateToken(moreBadData);
    }).toThrow("INVALID_DATA_INPUT");

    expect(() => {
      tokenService.generateToken(yetMoreBadData);
    }).toThrow("INVALID_DATA_INPUT");
  });

  test("When given valid inputs, it returns a well-formed JWT.", () => {
    const data = { 
      clientId: "my-client-id",
      clientSecret: "my-client-secret"
    }

    const jwt = tokenService.generateToken(data);

    expect(typeof jwt).toBe("string");
    expect(jwt.split(".").length).toBe(3);

  });

  test("It can validate a well-formed JWT.", () => {
    const data = { 
      clientId: "my-client-id",
      clientSecret: "my-client-secret"
    }

    const jwt = tokenService.generateToken(data);
    const decoded = tokenService.validateToken(jwt, data.clientSecret);

    expect(decoded).not.toBe(undefined);
    expect(decoded).toHaveProperty("azp");
    expect(decoded).toHaveProperty("iss");
    expect(decoded).toHaveProperty("exp");
    expect(decoded).toHaveProperty("gty");
    expect(decoded).toHaveProperty("aud");
    expect(decoded).toHaveProperty("sub");
    expect(decoded).toHaveProperty("iat");
  });

  test("It throws an error when it receives a poorly-formed JWT.", () => {
    expect(() => {
      tokenService.validateToken("memememememem",  data.clientSecret);
    }).toThrowError();
  });

  test("It throws an error when the signature of the token is invalid.", () => {
    const data = { 
      clientId: "my-client-id",
      clientSecret: "my-client-secret"
    }

    const jwt = tokenService.generateToken(data, data.clientSecret);
    const components = jwt.split(".");
    components[3] = "PrNacycqMN-ENY1UTMmn4n0UHjZ5NpNP-r_QZYDlu2k";
    const badJwt = components.join(".");
    expect(() => {
      tokenService.validateToken(badJwt);
    }).toThrowError();
  });

  
});