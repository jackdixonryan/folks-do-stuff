

// this is the chief file for the client API.


const express = require("express");

module.exports = clientApi = (function () { 
  "use strict";

  const clientApp = express();
  const port = 4000;
  clientApp.use(express.json()); 

  clientApp.get("/ping", (req, res, next) => res.status(200).send({ message: "pong" }));
  clientApp.post("/token", (req, res, next) => { });

  return {
    start() {
      clientApp.listen(port, () => {
        console.log(`CLIENT_API: PORT ${port}`);
      });
    }
  }
})();