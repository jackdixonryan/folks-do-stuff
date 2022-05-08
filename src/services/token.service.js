const jwtStuff = require("jsonwebtoken");

const tokenService = (function module() {
  "use strict";

  return {
    generateToken(data) {
      // unsigned token = base64url(header) + "." + base64url(data);
      // JWT = unsignedToken + "." + base64url(HMAC256(unsignedToken, secret));
      if (!data.clientId || !data.clientSecret) {
        throw new Error("INVALID_DATA_INPUT");
      }

      const payloadFields = { 
        azp: data.clientId,
        iss: new Date().getTime() / 1000,
        exp: (new Date().getTime() / 1000) + 86400,
        gty: "client-credentials",
        aud: "https://folks-do-stuff-apis",
        sub: `${data.clientId}@clients`,
        iss: "https://folks-do-stuff-apis",
      } 

      const jwt = jwtStuff.sign(payloadFields, data.clientSecret);
      return jwt;
    },
    validateToken(token, secret) {
      const decoded = jwtStuff.verify(token, secret);
      return decoded;
    }
  }
})();

module.exports = tokenService;