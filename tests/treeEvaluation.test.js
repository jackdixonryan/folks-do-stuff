const Tree = require("../src/services/tree.service");

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
    const rootNodeId = tree.addNode({ 
      data: { 
        description: "Evaluates whether the creature is hungry or not.",
        main(context) {
          if (!context) {
            throw new Error("NO_CONTEXT");
          } else {
            const { hunger } = context;
            if (hunger > 100) {
              return "Yes"
            } else {
              return "No"
            }
          }
        }
      }
    });

    expect(tree).toHaveProperty("executeNode");

  });

  test("Any node with an executable function requires a context read during invocation.", () => {
    const context = { 
      hunger: 100,
    }
    const tree = new Tree(context);
    const rootNodeId = tree.addNode({ 
      data: { 
        description: "Evaluates whether the creature is hungry or not.",
        main(context) {
          if (!context) {
            throw new Error("NO_CONTEXT");
          } else {
            const { hunger } = context;
            if (hunger > 100) {
              return "Yes"
            } else {
              return "No"
            }
          }
        }
      }
    });

    expect(() => { tree.executeNode(rootNodeId) }).not.toThrow("NO_CONTEXT");
    const result = tree.executeNode(rootNodeId);
    expect(result).toBe("No");

  });

  // next and most important: node traversal. This is a tough one. 

  // the main function passed to a node should _ALWAYS_ return 
  // the next NODE for invocation 
});