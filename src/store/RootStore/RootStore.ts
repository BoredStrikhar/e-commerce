import { CartStore } from './CartStore';
import { OrdersStore } from './OrdersStore';
import { QueryParamsStore } from './QueryParamsStore';
import { UserStore } from './UserStore';

export default class RootStore {
  readonly query = new QueryParamsStore();
  readonly user = new UserStore();
  readonly cart = new CartStore();
  readonly orders = new OrdersStore();
}
