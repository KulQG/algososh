export class Node<T> {
  value: T;
  next: Node<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;

  constructor(size: number) {
    this.head = null;
    this.tail = null;
    this.size = size;
  }

  addAtHead(value: T): void {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.size++;
  }

  addAtTail(value: T): void {
    const newNode = new Node(value);
    if (!this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  addAtIndex(index: number, value: T): void {
    if (index < 0 || index > this.size) {
      throw new Error("Index out of bounds.");
    }

    if (index === 0) {
      this.addAtHead(value);
    } else if (index === this.size) {
      this.addAtTail(value);
    } else {
      const newNode = new Node(value);
      let currentNode = this.head;
      let previousNode = null;
      let currentIndex = 0;

      while (currentIndex < index) {
        previousNode = currentNode;
        currentNode = currentNode!.next;
        currentIndex++;
      }

      newNode.next = currentNode;
      previousNode!.next = newNode;
    }
    this.size++;
  }

  removeAtHead(): void {
    if (!this.head) {
      throw new Error("List is empty.");
    }

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
    }
    this.size--;
  }

  removeAtTail(): void {
    if (!this.tail) {
      throw new Error("List is empty.");
    }

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      let currentNode = this.head;
      let previousNode = null;

      while (currentNode !== this.tail) {
        previousNode = currentNode;
        currentNode = currentNode!.next;
      }

      previousNode!.next = null;
      this.tail = previousNode;
    }
    this.size--;
  }

  removeAtIndex(index: number): void {
    if (index < 0 || index >= this.size) {
      throw new Error("Index out of bounds.");
    }

    if (index === 0) {
      this.removeAtHead();
    } else if (index === this.size - 1) {
      this.removeAtTail();
    } else {
      let currentNode = this.head;
      let previousNode = null;
      let currentIndex = 0;

      while (currentIndex < index) {
        previousNode = currentNode;
        currentNode = currentNode!.next;
        currentIndex++;
      }

      previousNode!.next = currentNode!.next;
    }
    this.size--;
  }

  getElements(): T[] {
    const elements: T[] = [];
    let currentNode = this.head;

    while (currentNode) {
      elements.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return elements;
  }

  getHead(): { value: T; index: number } | undefined {
    if (this.head) {
      return { value: this.head.value, index: 0 };
    }
    return undefined;
  }

  getTail(): { value: T; index: number } | undefined {
    if (this.tail) {
      return { value: this.tail.value, index: this.size - 1 };
    }
    return undefined;
  }
}
