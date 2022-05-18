// this is the chief file for the decision API.
const express = require("express");
const authentication = require("../middleware/authenticate");

module.exports = decisionApi = (function () { 
  "use strict";

  const decisionApp = express();
  decisionApp.use(express.json()); 
  decisionApp.get("/ping", (req, res, next) => res.status(200).send({ message: "pong" }));

  decisionApp.use(authentication);
  
  decisionApp.post("/trees", (req, res, next) => {
    const { body, headers } = req;
    if (!body.tree) {
      res.status(400).send({
        error: {
          code: "NO_TREE",
          message: "The request body must include a tree.",
          link: ""
        }
      });
    } else {
      const { tree } = body;
      const allNodesCorrect = Array.isArray(tree) && tree.length > 0 && tree.every(node => {
        node.id
      });

      if (!allNodesCorrect) {
        res.status(400).send({
          error: {
            code: "INVALID_NODES",
            message: "depends",
            link: ""
          }
        });
      } else {
        res.send({ message: "ok" });
      }
    }
  });

  return decisionApp;
})();