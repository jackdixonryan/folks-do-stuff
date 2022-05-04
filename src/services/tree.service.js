const crypto = require("crypto"); 

module.exports = class Tree {
  constructor(context = null) {
    this.id = crypto.randomUUID();
    this.nodes = [];
    if (context) {
      this.context = context;
    }
  }

  addNode(options=null) {
    let node, parentId, data;

    if (options) {
      if (options.parentId) {
        parentId = options.parentId;
      }
      if (options.data) {
        data = options.data;
      }
    }

    if (this.getNodeCount() === 0) { 
      node = new Node();
    } else {
      if (parentId) {
        const parentNode = this.getNode(parentId);
        if (!parentNode) { 
          throw new Error("PARENT_NOT_FOUND")
        } else { 
          node = new Node({ parentId: parentId });
          parentNode.addChild(node);
        }
      } else {
        throw new Error("PARENT_REQUIRED");
      }
    }

    if (data) {
      node.setData(data);
    }

    this.nodes.push(node);
    return node.id;
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
      const result = node.execute(this.context);
      return result;
    }
  }
}

class Node { 
  constructor(options = null) {

    let data; 
    let parentId; 

    if (options) {
      data = options.data;
      parentId = options.parentId;
    }

    this.id = crypto.randomUUID();
    if (data) {
      this.data = data;
    } else {
      this.data = null;
    }

    if (parentId) {
      this.parent = parentId;
      this.isRoot = false;
    } else {
      this.parent = null;
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

  execute(context) { 
    const result = this.data.main(context);
    return result;
  }
}