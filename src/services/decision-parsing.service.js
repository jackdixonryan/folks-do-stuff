const { Node } = require("./tree.service");

const nodeEvaluator = (function module() {
  "use strict";

  return {
    // takes a JSON packet and uses it to return a node. 
    parse(tree) {
      // where JSON might be like
      const edges = [
        { need: "hunger", operator: ">", value: 50, next: Action/Node },
        { need: "hunger", operator: "<", value: 50, next: Action/Node },
        { need: "thirst", operator: ">", value: 50, next: Action/Node },
        { need: "thirst", operator: "<", value: 50, next: Action/Node },
      ]
    },
    evaluate(node) {

    }
  }
})();

module.exports = nodeEvaluator;