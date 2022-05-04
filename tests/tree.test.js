const Tree = require("../src/services/tree.service");

describe("The Tree", () => {
  
  test("The tree can be declared and has an id.", () => {
    const tree = new Tree();
    const { id } = tree;
    expect(id).not.toBeUndefined();
  });

  test("You can add nodes to the tree.", () => {
    const tree = new Tree();
    const nodeId = tree.addNode();
    expect(typeof nodeId).toBe("string");
    expect(tree.getNodeCount()).toBe(1); 
  });

  test("You can retrieve a node with its ID.", () => {
    const tree = new Tree();
    const nodeId = tree.addNode();
    const node = tree.getNode(nodeId);
    expect(node).not.toBeUndefined();
  });

  test("You receive a null value if you search for a nonexistent node.", () => {
    const tree = new Tree();
    const node = tree.getNode("doesnt");
    expect(node).toBeNull();
  });

  test("The first node you add is the root node. It has no parent array.", () => {
    const tree = new Tree(); 
    const nodeId = tree.addNode();
    const node = tree.getNode(nodeId); 

    expect(node.isRoot).toBe(true);
    expect(node.parents).toBeUndefined();
  });

  test("All non-root nodes require a parent node.", () => {
    const tree = new Tree(); 
    const rootNodeId = tree.addNode();
   
    expect(() => { tree.addNode({}) }).toThrow("PARENT_REQUIRED");
    expect(() => { tree.addNode({ parentId: "nonexistentId"}) }).toThrow("PARENT_NOT_FOUND");

    const validNodeId = tree.addNode({ parentId: rootNodeId });
    const validNode = tree.getNode(validNodeId);
    expect(validNode.id).not.toBeUndefined();
  });

  test("Nodes added after the first node are not considered root nodes.", () => {
    const tree = new Tree(); 
    const rootNodeID = tree.addNode();
    const secondNodeId = tree.addNode({ parentId: rootNodeID });
    const secondNode = tree.getNode(secondNodeId);

    expect(secondNode.isRoot).toBe(false);
  });

  test("A parent node retains references to children. A child node has a reference to its parent.", () => {
    const tree = new Tree(); 
    const rootNodeId = tree.addNode();
    const secondNodeId = tree.addNode({ parentId: rootNodeId });
    const secondNode = tree.getNode(secondNodeId);
    const rootNode = tree.getNode(rootNodeId);

    expect(rootNode.children.includes(secondNodeId)).toBe(true);
    expect(secondNode.parent).toBe(rootNodeId);
  });

  test("You cannot delete a non-existent node.", () => {
    const tree = new Tree(); 
    expect(() => { tree.deleteNode("nonexistent"); }).toThrow("NODE_NOT_FOUND");
  });

  test("Deleting a node deletes ALL of its children and descendents.", () => {
    const tree = new Tree(); 
    const rootNodeId = tree.addNode();
    const secondNodeId = tree.addNode({ parentId: rootNodeId });
    const thirdNodeId = tree.addNode({ parentId: secondNodeId });

    tree.deleteNode(rootNodeId);
    expect(tree.getNode(rootNodeId)).toBeNull();
    expect(tree.getNode(secondNodeId)).toBeNull();
    expect(tree.getNode(thirdNodeId)).toBeNull();

    expect(tree.getNodeCount()).toBe(0);
  });

  test("Deleting a node leaves its siblings unaffected.", () => {
    const tree = new Tree(); 
    const rootNodeId = tree.addNode();
    const secondNodeId = tree.addNode({ parentId: rootNodeId });
    const thirdNodeId = tree.addNode({ parentId: secondNodeId });

    const firstSibling = tree.addNode({ parentId: rootNodeId });
    const firstNephew = tree.addNode({ parentId: firstSibling });

    tree.deleteNode(secondNodeId);

    expect(tree.getNode(secondNodeId)).toBeNull();
    expect(tree.getNode(thirdNodeId)).toBeNull();

    expect(tree.getNode(firstSibling)).not.toBeNull();
    expect(tree.getNode(firstNephew)).not.toBeNull();
  });

  test("Data can be passed to a node. The data requires a name, some help text (to contextualize the action for a reader) and some executable code in a main function.", () => {
    const tree = new Tree(); 
    const rootNodeId = tree.addNode({ 
      data: {
        description: "Determines actions on hunger level.", 
        main(context) { 
          console.log("I have been declared.");
        }
      }
    });
    
    const rootNode = tree.getNode(rootNodeId);
    expect(rootNode).toHaveProperty("data");
    const { data } = rootNode;
    expect(data).toHaveProperty("description");
    expect(data).toHaveProperty("main");

    expect(typeof data.main).toBe("function");

    // error handling
    expect(() => {
      tree.addNode({
        parentId: rootNodeId,
        data: {
          random: "BS"
        }
      });
    }).toThrow("INVALID_NODE_DATA");
  });

  // now it's time to talke about traversing the node tree.
  // this entails taking a CONTEXT passed to the tree and passing it into the tree. 
});