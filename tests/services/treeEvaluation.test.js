const { Tree, Node } = require("../../src/services/game/tree.service");

describe("The Evaluation of Executable Trees", () => {

  test("A tree can be declared with an optional context.", () => {
    const context = { 
      hunger: 100,
    }
    const tree = new Tree(context);
    expect(tree.context).not.toBe(undefined);
    expect(tree.context).toHaveProperty("hunger");
  });

  test("A method's executable function is run from the tree, with an execute property.", () => {
    const tree = new Tree();
    expect(tree).toHaveProperty("executeNode");
  });

  test("Any node with an executable function requires a context read during invocation.", () => {
    const context = { 
      hunger: 100,
    }

    const rootNode = new Node({
      data: { 
        description: "Evaluates whether the creature is hungry or not.",
        main(context) {
          if (!context) {
            throw new Error("NO_CONTEXT");
          } else {
            const { hunger } = context;
            if (hunger > 100) {
              return { result: "Yes" }
            } else {
              return { result: "No" }
            }
          }
        }
      }
    });

    const tree = new Tree(context);
    const rootNodeId = tree.addNode(rootNode);
    expect(() => { tree.executeNode(rootNodeId) }).not.toThrow("NO_CONTEXT");
    const result = tree.executeNode(rootNodeId);
    expect(result).toBe("No");
  });

  // next and most important: node traversal. This is a tough one. 
  // the main function passed to a node should _ALWAYS_ return 
  // the next NODE for invocation. 
  // this WILL probably break backward tests as it will impose restrictions on the larger tree. 

  test("A tree can be evaluated. It will throw an error if no nodes are present, though.", () => {
    const tree = new Tree();
    expect(tree).toHaveProperty("evaluate");
    expect(() => { tree.evaluate(); }).toThrow("NO_EVALUABLE_NODES");
  });

  test("An evaluable tree can fetch its root node.", () => {
    const tree = new Tree();
    expect(tree).toHaveProperty("getRootNode");
    const rootNode = new Node();
    tree.addNode(rootNode);
    const rootNodeId = tree.getRootNode().id;
    expect(rootNode.id).toBe(rootNodeId);
  });

  test("During evaluation, a node that fails to return a subsequent node value is considered the end of execution and is returned as an outcome.", () => {
    const context = { 
      hunger: 100,
    }
    const tree = new Tree(context);
    const rootNode = new Node({ 
      data: { 
        description: "Returns yes or no.",
        main(context) {
          if (!context) {
            throw new Error("NO_CONTEXT");
          } else {
            const { hunger } = context;
            if (hunger > 100) {
              return { result: "Yes" }
            } else {
              return { result: "No" }
            }
          }
        }
      }
    })
    // this is an example of a relatively invalid node, but the code should interpret it as a terminal node as it fails to return.
    // this is implicit typing though; we should also throw an error if a node that appears terminal has children.
    tree.addNode(rootNode);
    const result = tree.evaluate();
    expect(result).toBe("No");
  });

  // this is not true. A node could be both a terminus and an invoker... Maybe...
  test("However, if a node interpreted to be a terminus has children, execution will throw an error.", () => {
    const context = { 
      hunger: 100,
    }
    const tree = new Tree(context);
    const rootNode = new Node({ 
      data: { 
        description: "Evaluates whether the creature is hungry or not.",
        main(context) {
          if (!context) {
            throw new Error("NO_CONTEXT");
          } else {
            const { hunger } = context;
            if (hunger > 100) {
              return { result: "Yes" }
            } else {
              return { result: "No" }
            }
          }
        }
      }
    });
    const secondNode = new Node({ 
      parentId: rootNode.id,
      data: {
        description: "Evaluates whether the creature is thirsty or not.",
        main(context) {
          if (!context) {
            throw new Error("NO_CONTEXT");
          } else {
            const { thirst } = context;
            if (thirst > 100) {
              return { result: "THIRSTY" };
            } else {
              return { result: "NOT_THIRSTY" };
            }
          }
        }
      }
    })
    // this is an example of a relatively invalid node, but the code should interpret it as a terminal node as it fails to return.
    // this is implicit typing though; we should also throw an error if a node that appears terminal has children.
    tree.addNode(rootNode);
    tree.addNode(secondNode);

    expect(() => { tree.evaluate() }).toThrow("INVALID_TERMINAL_NODE");
  });
});