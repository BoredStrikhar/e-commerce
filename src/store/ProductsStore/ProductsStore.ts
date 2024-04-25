import axios from 'axios';
import { IReactionDisposer, action, computed, makeObservable, observable, reaction, runInAction } from 'mobx';
import rootStore from 'store/RootStore';
import { ProductApi, ProductModel, normalizeProduct } from 'store/models/Product';
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from 'store/models/shared/collections';
import { Meta } from 'utils/meta';
import { ILocalStore } from 'utils/useLocalStore';
import { GetProductsListParams, IProductsStore } from './types';

type PrivateFields = '_list' | '_meta';

export default class ProductsStore implements IProductsStore, ILocalStore {
  private _list: CollectionModel<number, ProductModel> = getInitialCollectionModel();
  private _meta: Meta = Meta.initial;
  search: string = '';

  constructor() {
    makeObservable<ProductsStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      search: observable,
      list: computed,
      meta: computed,
      getProductsList: action,
    });

    const initialSearch = rootStore.query.getParam('search');

    if (initialSearch) {
      this.search = initialSearch.toString();
    }
  }

  get list(): ProductModel[] {
    return linearizeCollection(this._list);
  }

  get meta(): Meta {
    return this._meta;
  }

  async getProductsList(params: GetProductsListParams): Promise<void> {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();
    const response = await axios<ProductApi[]>({
      method: 'get',
      url: 'https://api.escuelajs.co/api/v1/products',
      params: {
        offset: params.offset,
        limit: params.limit,
        title: this.search,
      },
    });

    runInAction(() => {
      if (!response.data) {
        this._meta = Meta.error;
      }
      try {
        this._meta = Meta.success;
        this._list = normalizeCollection(normalizeProduct(response.data), (listItem) => listItem.id);
        return;
      } catch (e) {
        this._meta = Meta.error;
        this._list = getInitialCollectionModel();
      }
    });
  }

  destroy(): void {
    this._qpReaction();
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('search'),
    (search) => {
      if (search) {
        this.search = search.toString();
        return;
      }
      this.search = '';
    },
  );
}
