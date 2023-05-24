interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => void;
  getSize: () => number;
  getElements: () => T[];
  clear: () => void;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    if (this.container.length !== 0) {
      this.container.pop();
    }
  };

  peak = (): T | null => {
    if (this.container.length === 0) {
      return null;
    }
    return this.container[this.container.length - 1];
  };

  clear = (): void => {
    this.container = [];
  };

  getSize = (): number => this.container.length;

  getElements = () => this.container;
}
