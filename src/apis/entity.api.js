

// this is the chief file for the entity API.


const express = require("express");

module.exports = entityApi = (function () { 
  "use strict";

  const entityApp = express();
  const port = 2000;
  entityApp.use(express.json()); 
  entityApp.get("/ping", (req, res, next) => res.status(200).send({ message: "pong" }));

  return entityApp;
})();