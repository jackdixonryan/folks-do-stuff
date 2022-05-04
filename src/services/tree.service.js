const crypto = require("crypto"); 

class Tree {
  constructor(context = null) {
    this.id = crypto.randomUUID();
    this.nodes = [];
    if (context) {
      this.context = context;
    }
  }

  addNode(node) {
    if (this.getNodeCount() === 0) {
      this.nodes.push(node);
      return node.id;
    } else {
      const { parentId } = node;
      if (!parentId) {
        throw new Error("PARENT_REQUIRED");
      } else {
        const parentNode = this.getNode(parentId);
        if (!parentNode) {
          throw new Error("PARENT_NOT_FOUND");
        } else {
          this.nodes.push(node);
          parentNode.children.push(node.id);
          return node.id;
        }
      }
    }
  }

  getNodeCount() {
    return this.nodes.length;
  }

  getNode(nodeId) {
    const node = this.nodes.find((node) => node.id === nodeId);
    if (node) {
      return node;
    } else {
      return null;
    }
  }

  deleteNode(nodeId) {
    const nodeIndex = this.nodes.findIndex((node) => node.id === nodeId); 
    if (nodeIndex !== -1) {
      const node = this.getNode(nodeId);
      const children = node.children; 
      this.nodes.splice(nodeIndex, 1);
      for (let i = 0; i < children.length; i++) {
        this.deleteNode(children[i]);
      }
    } else {
      throw new Error("NODE_NOT_FOUND");
    }
  }

  executeNode(nodeId) {
    const node = this.getNode(nodeId);
    if (!node) {
      throw new Error("NODE_NOT_FOUND");
    } else {
      const { nextNodeId, result } = node.execute(this.context);
      if (nextNodeId) { // indicating that a child node needs to be evaluated 
        const children = node.children;         
        if (!node.children || node.children.length === 0) {
          throw new Error("INVALID_INTERMEDIATE_NODE");
        } else {
          if (!children.includes(nextNodeId)) { 
            throw new Error("INVALID_NEXT_NODE_INVOCATION");
          } else {
            return this.executeNode(nextNodeId);
          }
        }
      } else { // indicating we've arrived at a terminal node 
        if (node.children.length > 0) {
          throw new Error("INVALID_TERMINAL_NODE");
        } 
        return result;
      }
    }
  }

  getRootNode() {
    if (this.getNodeCount() === 0) {
      throw new Error("NO_EVALUABLE_NODES");
    } else {
      const rootNode = this.nodes.find((node) => node.isRoot === true);
      return rootNode;
    }
  }

  getAllNodes() {
    return this.nodes;
  }

  evaluate(context = null) {
    if (context) { 
      this.context = context;
    }

    if (this.getNodeCount() === 0) {
      throw new Error("NO_EVALUABLE_NODES");
    } else {
      const outcome = this.executeNode(this.getRootNode().id);
      return outcome;
    }
  }
}

class Node { 
  constructor(options = null) {

    let data; 
    let parentId; 

    if (options) {
      if (options.data) {
        if (!options.data.description || !options.data.main || typeof options.data.main !== "function") {
          throw new Error("INVALID_NODE_DATA");
        } else {
          data = options.data;
        }
      }
      parentId = options.parentId;
    }

    this.id = crypto.randomUUID();
    if (data) {
      this.data = data;
    } else {
      this.data = null;
    }

    if (parentId) {
      this.parentId = parentId;
      this.isRoot = false;
    } else {
      this.parentId = null;
      this.isRoot = true;
    }
    this.children = [];
  }

  addChild(node) {
    this.children.push(node.id);
  } 

  setData(data) {
    const { main, description } = data;
    if (!main || !description || typeof description !== "string" || typeof main !== "function") {
      throw new Error("INVALID_NODE_DATA")
    } else {
      this.data = data;
    }
  }

  setParentId(parentId) {
    this.parentId = parentId;
    this.isRoot = false;
  }

  execute(context) { 
    const { nextNodeId, result } = this.data.main(context);
    if (!nextNodeId && !result) { 
      throw new Error("INVALID_NODE_RETURN_VALUES");
    } else if (result) {
      return { result };
    } else {
      return { nextNodeId };
    }
  }
}

module.exports = { Tree, Node }