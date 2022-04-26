const { NotImplementedError } = require('../extensions/index.js');

// const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  constructor() {
    this.tail = null;
  }

  getUnderlyingList() {
    return this.tail;
  }

  enqueue(value) {
    if (this.tail === null) {
      this.tail = new ListNode(value);
      return;
    }

    let curr = this.tail;

    while (curr.next !== null) {
      curr = curr.next;
    }
    const newNode = new ListNode(value);
    curr.next = newNode;
  }

  dequeue() {
    let curr = this.tail;
    this.tail = this.tail.next;
    return curr.value;
  }
}

module.exports = {
  Queue
};
