import axios from 'axios';
import { action, computed, makeObservable, observable } from 'mobx';
import { ProductApi, ProductModel, normalizeProduct } from 'store/models/Product';
import Collection from 'store/models/shared/collections';
import { Meta } from 'utils/meta';

type PrivateFields = '_meta' | '_cart' | '_products' | '_cartTotal';

export class CartStore {
  private _products: Collection<number, ProductModel> = new Collection<number, ProductModel>(
    [],
    (element) => element.id,
  );
  private _cart: { [key: string]: number } = {};
  private _meta: Meta = Meta.initial;
  private _cartTotal: number = 0;

  constructor() {
    makeObservable<CartStore, PrivateFields>(this, {
      _products: observable.ref,
      _cart: observable.ref,
      _meta: observable,
      _cartTotal: observable,
      meta: computed,
      cart: computed,
      products: computed,
      productsAmount: computed,
      cartTotal: computed,
      addProductToCart: action,
      removeProductFromCart: action,
      getProducts: action,
    });

    const cartString = localStorage.getItem('cart');

    if (cartString !== null) {
      this._cart = JSON.parse(cartString);
    }
  }

  get meta(): Meta {
    return this._meta;
  }

  get products(): ProductModel[] {
    return this._products.linearize();
  }

  get cart() {
    return this._cart;
  }

  get productsAmount(): number {
    return Object.values(this._cart).reduce((accum, item) => accum + item, 0);
  }

  get cartTotal(): number {
    return this.products.reduce((total, item) => {
      if (this._cart[item.id]) {
        return (total += Number(item.price) * Number(this._cart[item.id]));
      }
      return total;
    }, 0);
  }

  addProductToCart(id: string) {
    const cartString = localStorage.getItem('cart');
    if (cartString !== null) {
      const cart = JSON.parse(cartString);
      if (cart[id] > 0) {
        cart[id] += 1;
        this._cart = cart;
        localStorage.setItem('cart', JSON.stringify(cart));
        return;
      }
      cart[id] = 1;
      this._cart = cart;
      localStorage.setItem('cart', JSON.stringify(cart));
      return;
    }
    this._cart = { [id]: 1 };
    localStorage.setItem('cart', JSON.stringify({ [id]: 1 }));
  }

  removeProductFromCart(id: string) {
    const cartString = localStorage.getItem('cart');
    if (cartString !== null) {
      const cart = JSON.parse(cartString);
      if (cart[id] > 1) {
        cart[id] -= 1;
        this._cart = cart;
        localStorage.setItem('cart', JSON.stringify(cart));
        return;
      }
      delete cart[id];
      this._cart = cart;
      localStorage.setItem('cart', JSON.stringify(cart));
      return;
    }
  }

  async getProducts(): Promise<void> {
    this._meta = Meta.loading;
    this._products.clear();
    const idList = Object.keys(this._cart);
    idList.forEach((id) => {
      axios<ProductApi>({
        method: 'get',
        url: `https://api.escuelajs.co/api/v1/products/${id}`,
      })
        .then((response) => {
          this._products.add(normalizeProduct([response.data]));
        })
        .catch(() => {
          this._meta = Meta.error;
          return;
        });
    });
    this._meta = Meta.success;
  }

  destroy(): void {}
}
