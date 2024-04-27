import { extendObservable } from 'mobx';

export type CollectionModel<K extends string | number, T> = {
  order: K[];
  entities: Record<K, T>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getInitialCollectionModel = (): CollectionModel<any, any> => ({
  order: [],
  entities: {},
});

export const normalizeCollection = <K extends string | number, T>(
  elements: T[],
  getKeyForElement: (element: T) => K,
): CollectionModel<K, T> => {
  const collection: CollectionModel<K, T> = getInitialCollectionModel();
  elements.forEach((el) => {
    const id = getKeyForElement(el);
    collection.order.push(id);
    collection.entities[id] = el;
  });

  return collection;
};

export const linearizeCollection = <K extends string | number, T>(elements: CollectionModel<K, T>): T[] =>
  elements.order.map((el) => elements.entities[el]);

interface ICollection<K extends string | number, T> {
  order: K[];
  entities: Record<K, T>;
  getKey: (element: T) => K;
}

class Collection<K extends string | number, T> implements ICollection<K, T> {
  order: K[];
  entities: Record<K, T>;
  getKey: (element: T) => K;
  private _List: T[] | null;

  constructor(array: T[], getKey: (element: T) => K) {
    this.getKey = getKey;
    this.entities = {} as Record<K, T>;
    this.order = array.map((element) => this.getKey(element));
    array.forEach((value, index) => {
      this.entities[this.order[index]] = value;
    });
    this._List = null;

    extendObservable(this, {
      order: this.order,
      entries: this.entities,
      _List: this._List,
      add: this.add,
      clear: this.clear,
    });
  }

  clear() {
    this.order = [];
    this.entities = {} as Record<K, T>;
    this._List = null;
  }

  add(array: T[]) {
    const initialLength = this.order.length;
    this._List = null;
    array.forEach((element) => this.order.push(this.getKey(element)));
    array.forEach((value, index) => {
      this.entities[this.order[initialLength + index]] = value;
    });
  }

  get length(): number {
    return this.order.length;
  }
}

export default Collection;
