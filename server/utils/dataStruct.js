class Node {
  constructor(value , next, prev) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}

class DataStruct {
  constructor() {
    this.head = null;
    this.next = null;
  }

  addNode(value) {
    if(this.head === null) this.head = new Node(value);
    else this.next = new Node(value);
  }

  findNode(value) {
    let thisNode = this.head;

    while(thisNode) {
      if(thisNode.value === value) return thisNode;

      thisNode = thisNode.next;
    }

    return thisNode;
  }

  deleteNode() {

  }

  insertNode() {

  }
}

dataStruct = new DataStruct();
dataStruct.addNode(5);
dataStruct.addNode(4);
console.log(dataStruct);

console.log('Search NODE', dataStruct.findNode(5));

module.exports = DataStruct;