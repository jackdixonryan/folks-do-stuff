// Here is what we call an all-up test. The units are all passing. Everything _appears_ to be correct.
// but there's no way to know without taking a little leap. So, here we go. 
const { Tree, Node } = require("../../src/services/game/tree.service");
describe("The bare necessities decision tree", () => {

  let tree;

  // these are Evaluation Nodes
  let hungerNode;
  let thirstNode;

  // these are Action Nodes
  let eatNode;
  let drinkNode;
  let idleNode;

  beforeEach(() => {
    tree = new Tree();

    idleNode = new Node({
      data: {
        description: "I have nothing to do.",
        main(context) {
          return { result: "IDLE" }
        }
      }
    });

    drinkNode = new Node({ 
      data: {
        description: "I need to drink.",
        main(context) {
          return { result: "DRINK_SOMETHING" }
        }
      }
    });

    eatNode = new Node({
      data: {
        description: "I need to eat.",
        main(context) {
          return { result: "EAT_SOMETHING" }
        }
      }
    });

    thirstNode = new Node({
      data: {
        description: "Determines whether I am thirsty or not.",
        main(context) {
          if (context.thirst > 50) {
            return { nextNodeId: drinkNode.id }; 
          } else {
            return { nextNodeId: idleNode.id };
          }
        }
      }
    });

    hungerNode = new Node({
      data: {
        description: "Determines whether I am hungry or not.",
        main(context) {
          if (context.hunger > 50) {
            return { nextNodeId: eatNode.id };
          } else {
            return { nextNodeId: thirstNode.id };
          }
        }
      }
    });

    eatNode.setParentId(hungerNode.id);
    drinkNode.setParentId(thirstNode.id);
    thirstNode.setParentId(hungerNode.id);
    idleNode.setParentId(thirstNode.id);

    tree.addNode(hungerNode);
    tree.addNode(eatNode);
    tree.addNode(thirstNode);
    tree.addNode(drinkNode);
    tree.addNode(idleNode);
  });

  test("If hunger and thirst are both fine, it will idle.", () => {
    const allNeedsMet = {
      hunger: 0, 
      thirst: 0,
    }
    const result = tree.evaluate(allNeedsMet);
    expect(result).toBe("IDLE");
  });

  test("If hunger is bad, the creature will try to eat.", () => {
    const hungry = {
      hunger: 1000,
      thirst: 0,
    }
    const result = tree.evaluate(hungry);
    expect(result).toBe("EAT_SOMETHING");
  });

  test("If the animal is hungry AND thirsty, it will try to eat first.", () => {
    const both = { 
      hunger: 1000,
      thirst: 1000,
    }
    const result = tree.evaluate(both);
    expect(result).toBe("EAT_SOMETHING");
  });

  test("If the animal is only thirsty, it will try to drink something.", () => {
    const thirsty = {
      hunger: 1, 
      thirst: 10000
    }

    const result = tree.evaluate(thirsty);
    expect(result).toBe("DRINK_SOMETHING");
  });
});