# Folks Do Stuff
Evaluation Trees for Everything.

| Statements                  | Branches                | Functions                 | Lines             |
| --------------------------- | ----------------------- | ------------------------- | ----------------- |
| ![Statements](https://img.shields.io/badge/statements-93.33%25-brightgreen.svg?style=flat) | ![Branches](https://img.shields.io/badge/branches-85.36%25-yellow.svg?style=flat) | ![Functions](https://img.shields.io/badge/functions-90.9%25-brightgreen.svg?style=flat) | ![Lines](https://img.shields.io/badge/lines-93.14%25-brightgreen.svg?style=flat) |

# Usage 
```javascript
const context = { ... } // fill your context with whatever you want. 
const tree = new Tree();

const node = new Node({
  data: {
    description: "This node determines whether X is true." 
    main(context) { 
      // write a custom function to read from context
    }
  }
});

const childNode = new Node({
  data: {
    description: "This node determines whether X is true." 
    main(context) { 
      // write a custom function to read from context
    },
    parentId: node.id
  }
});

tree.addNode(node);
tree.addNode(childNode);

const result = tree.evaluate(context);
// whichever the last, lowest node in the tree is, 
// that is the code which shall invoke. 
```