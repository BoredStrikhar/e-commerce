import { QueryParamsStore } from './QueryParamsStore';
import { UserStore } from './UserStore';
export default class RootStore {
  readonly query = new QueryParamsStore();
  readonly user = new UserStore();
}
