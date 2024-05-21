import { action, computed, makeObservable, observable } from 'mobx';
import { OrderModel } from 'store/models/Order';
import { Meta } from 'utils/meta';

type PrivateFields = '_meta' | '_orders';

export class OrdersStore {
  private _orders: { [key: string]: number } = {};
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<OrdersStore, PrivateFields>(this, {
      _orders: observable.ref,
      _meta: observable,
      meta: computed,
      orders: computed,
      addOrder: action,
    });

    const ordersString = localStorage.getItem('orders');

    if (ordersString !== null) {
      this._orders = JSON.parse(ordersString);
    }
  }

  get meta(): Meta {
    return this._meta;
  }

  get orders() {
    return this._orders;
  }

  addOrder(email: string, order: OrderModel) {
    const ordersString = localStorage.getItem('orders');
    if (ordersString !== null) {
      const orders = JSON.parse(ordersString);
      if (!orders[email]) {
        orders[email] = [];
      }
      orders[email].push(order);
      localStorage.setItem('orders', JSON.stringify(orders));
      return;
    }
    localStorage.setItem('orders', JSON.stringify({ [email]: [order] }));
  }

  getOrdersByEmail(email: string): OrderModel[] {
    const ordersString = localStorage.getItem('orders');
    if (ordersString) {
      const orders = JSON.parse(ordersString);
      return orders[email];
    }
    return [];
  }

  destroy(): void {}
}
