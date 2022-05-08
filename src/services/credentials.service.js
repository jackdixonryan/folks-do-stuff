const crypto = require("crypto");

const credentialService = (function module() {
  "use strict";

  return { 
    generateClientId() {
      return crypto.randomBytes(33).toString("hex");
    },
    generateSecret() {
      return crypto.randomBytes(33).toString("hex");
    }
  }
})();

module.exports = credentialService