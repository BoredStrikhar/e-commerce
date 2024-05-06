import { extendObservable } from 'mobx';

interface ICollection<K extends string | number, T> {
  order: K[];
  entities: Record<K, T>;
  getKey: (element: T) => K;
}

class Collection<K extends string | number, T> implements ICollection<K, T> {
  order: K[];
  entities: Record<K, T>;
  getKey: (element: T) => K;

  constructor(array: T[], getKey: (element: T) => K) {
    this.getKey = getKey;
    this.entities = {} as Record<K, T>;
    this.order = array.map((element) => this.getKey(element));
    array.forEach((value, index) => {
      this.entities[this.order[index]] = value;
    });

    extendObservable(this, {
      order: this.order,
      entries: this.entities,
      add: this.add,
      clear: this.clear,
    });
  }

  clear() {
    this.order = [];
    this.entities = {} as Record<K, T>;
  }

  add(array: T[]) {
    const initialLength = this.order.length;
    array.forEach((element) => this.order.push(this.getKey(element)));
    array.forEach((value, index) => {
      this.entities[this.order[initialLength + index]] = value;
    });
  }

  get length(): number {
    return this.order.length;
  }

  linearize(): T[] {
    return this.order.map((el) => this.entities[el]);
  }
}

export default Collection;
