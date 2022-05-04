const { Tree, Node } = require("../src/services/tree.service");

describe("The Tree", () => {
  
  test("The tree can be declared and has an id.", () => {
    const tree = new Tree();
    const { id } = tree;
    expect(id).not.toBeUndefined();
  });

  test("You can add nodes to the tree.", () => {
    const tree = new Tree();
    const node = new Node();
    const nodeId = tree.addNode(node);
    expect(typeof nodeId).toBe("string");
    expect(tree.getNodeCount()).toBe(1); 
  });

  test("You can retrieve a node with its ID.", () => {
    const tree = new Tree();
    const node = new Node();
    const nodeId = tree.addNode(node);
    const retrievedNode = tree.getNode(nodeId);
    expect(retrievedNode).not.toBeUndefined();
  });

  test("You receive a null value if you search for a nonexistent node.", () => {
    const tree = new Tree();
    const node = tree.getNode("doesnt");
    expect(node).toBeNull();
  });

  test("The first node you add is the root node. It has no parent array.", () => {
    const tree = new Tree(); 
    const node = new Node();
    const nodeId = tree.addNode(node);
    const rootNode = tree.getNode(nodeId); 

    expect(rootNode.isRoot).toBe(true);
    expect(rootNode.parents).toBeUndefined();
  });

  test("All non-root nodes require a parent node.", () => {
    const tree = new Tree(); 
    const rootNode = new Node();
    const rootNodeId = tree.addNode(rootNode);
    const invalidNode = new Node();
    const orphanNode = new Node({
      parentId: "nonexistent_parent"
    });

    expect(() => { tree.addNode(invalidNode) }).toThrow("PARENT_REQUIRED");
    expect(() => { tree.addNode(orphanNode) }).toThrow("PARENT_NOT_FOUND");

    const childNode = new Node({
      parentId: rootNodeId,
    });

    const validNodeId = tree.addNode(childNode);
    const validNode = tree.getNode(validNodeId);
    expect(validNode.id).not.toBeUndefined();
  });

  test("Nodes added after the first node are not considered root nodes.", () => {
    const tree = new Tree(); 
    const rootNode = new Node();
    const secondNode = new Node({
      parentId: rootNode.id
    });
   
    tree.addNode(rootNode);
    const secondNodeId = tree.addNode(secondNode);
    const fetchedSecondNode = tree.getNode(secondNodeId);

    expect(fetchedSecondNode.isRoot).toBe(false);
  });

  test("A parent node retains references to children. A child node has a reference to its parent.", () => {
    const tree = new Tree(); 
    const rootNode = new Node();
    const secondNode = new Node({
      parentId: rootNode.id
    });

    const rootNodeId = tree.addNode(rootNode);
    const secondNodeId = tree.addNode(secondNode);

    const fetchedRoot = tree.getNode(rootNodeId);
    const fetchedSecond = tree.getNode(secondNodeId);

    expect(fetchedRoot.children.includes(secondNodeId)).toBe(true);
    expect(fetchedSecond.parentId).toBe(rootNodeId);
  });

  test("You cannot delete a non-existent node.", () => {
    const tree = new Tree(); 
    expect(() => { tree.deleteNode("nonexistent"); }).toThrow("NODE_NOT_FOUND");
  });

  test("Deleting a node deletes ALL of its children and descendents.", () => {
    const tree = new Tree(); 
    const root = new Node();
    const secondNode = new Node({
      parentId: root.id,
    });
    const thirdNode = new Node({
      parentId: secondNode.id 
    });

    tree.addNode(root);
    tree.addNode(secondNode);
    tree.addNode(thirdNode);

    tree.deleteNode(root.id);
    expect(tree.getNode(root.id)).toBeNull();
    expect(tree.getNode(secondNode.id)).toBeNull();
    expect(tree.getNode(thirdNode.id)).toBeNull();

    expect(tree.getNodeCount()).toBe(0);
  });

  test("Deleting a node leaves its siblings unaffected.", () => {
    const tree = new Tree(); 
    const root = new Node();
    const secondNode = new Node({
      parentId: root.id,
    });
    const thirdNode = new Node({
      parentId: secondNode.id 
    });
    const sibling = new Node({
      parentId: root.id
    });

    const nephew = new Node({
      parentId: sibling.id 
    });

    tree.addNode(root);
    tree.addNode(secondNode);
    tree.addNode(thirdNode);
    tree.addNode(sibling);
    tree.addNode(nephew);

    tree.deleteNode(secondNode.id);

    expect(tree.getNode(secondNode.id)).toBeNull();
    expect(tree.getNode(thirdNode.id)).toBeNull();

    expect(tree.getNode(sibling.id)).not.toBeNull();
    expect(tree.getNode(nephew.id)).not.toBeNull();
  });

  test("Data can be passed to a node. The data requires a name, some help text (to contextualize the action for a reader) and some executable code in a main function.", () => {
    const rootNode = new Node({
      data: {
        description: "Determines actions on hunger level.", 
        main(context) { 
          console.log("I have been declared.");
        }
      }
    });    

    expect(rootNode).toHaveProperty("data");
    const { data } = rootNode;
    expect(data).toHaveProperty("description");
    expect(data).toHaveProperty("main");

    expect(typeof data.main).toBe("function");

    // error handling
    expect(() => {
      new Node({
        data: {
          random: "BS"
        }
      }); 
    }).toThrow("INVALID_NODE_DATA");
  });
});