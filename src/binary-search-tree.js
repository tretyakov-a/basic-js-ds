const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }
  
  find(data, process = node => node) {
    const traverse = (node, parent, nodeName) => {
      if (node === null || node.data === data) {
        return process(node, parent, nodeName);
      }
      const childName = data < node.data ? 'left' : 'right';
      return traverse(node[childName], node, childName)
    }
    return traverse(this.rootNode, null);
  }

  add(data) {
    return this.find(data, (_, parent, nodeName) => {
      const newNode = new Node(data);
      if (parent === null) {
        this.rootNode = newNode;
      } else {
        parent[nodeName] = newNode;
      }
      return true;
    });
  }

  has(data) {
    return this.find(data, node => Boolean(node));
  }

  remove(data) {
    return this.find(data, (node, parent, nodeName) => {
      const setNode = node => {
        if (parent === null) {
          this.rootNode = node;
        } else {
          parent[nodeName] = node;
        }
      }
      const findNewParent = () => {
        if (node.left && node.right) {
          const min = this.min(node.right, node => node);
          min.left = node.left;
          return node.right;
        }
        return node.left || node.right || null;
      }
      setNode(findNewParent());
      return true;
    })
  }

  _minmax(childName, startNode = this.rootNode, process = node => node ? node.data : null) {
    let curr = startNode;
    while (curr[childName] !== null) {
      curr = curr[childName];
    }
    return process(curr);
  }

  min(...args) {
    return this._minmax('left', ...args);
  }

  max(...args) {
    return this._minmax('right', ...args);
  }
}

module.exports = {
  BinarySearchTree
};