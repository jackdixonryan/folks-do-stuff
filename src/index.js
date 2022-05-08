
const entityApi = require("./apis/entity.api");
const decisionApi = require("./apis/decision.api");

(function start() {
  decisionApi.start();
  entityApi.start();
})();
