
const entityApi = require("./apis/entity.api");
const decisionApi = require("./apis/decision.api");
const clientApi = require("./apis/client.api");

(function start() {
  decisionApi.start();
  entityApi.start();
  clientApi.start();
})();
