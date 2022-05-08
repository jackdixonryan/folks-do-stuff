// this is the chief file for the decision API.
const express = require("express");

module.exports = decisionApi = (function () { 
  "use strict";

  const decisionApp = express();
  const port = 3000;
  decisionApp.use(express.json()); 

  decisionApp.get("/ping", (req, res, next) => res.status(200).send({ message: "pong" }));

  return {
    start() { 
      decisionApp.listen(port, () => {
        console.log(`DECISION_API: PORT ${port}`);
      });
    }
  } 
})();