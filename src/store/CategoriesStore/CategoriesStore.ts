import axios from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { CategoryApi, CategoryModel, normalizeCategory } from 'store/models/Category';
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from 'store/models/shared/collections';
import { Meta } from 'utils/meta';
import { ILocalStore } from 'utils/useLocalStore';

type PrivateFields = '_list' | '_meta';

export default class CategoriesStore implements ILocalStore {
  private _list: CollectionModel<number, CategoryModel> = getInitialCollectionModel();
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<CategoriesStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      list: computed,
      meta: computed,
      getCategoriesList: action,
    });
    this.getCategoriesList();
  }

  get list(): CategoryModel[] {
    return linearizeCollection(this._list);
  }

  get meta(): Meta {
    return this._meta;
  }

  async getCategoriesList(): Promise<void> {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();
    const response = await axios<CategoryApi[]>({
      method: 'get',
      url: 'https://api.escuelajs.co/api/v1/categories',
    });
    runInAction(() => {
      if (!response.data) {
        this._meta = Meta.error;
      }
      try {
        this._meta = Meta.success;
        this._list = normalizeCollection(normalizeCategory(response.data), (listItem) => listItem.id);
        return;
      } catch (e) {
        this._meta = Meta.error;
        this._list = getInitialCollectionModel();
      }
    });
  }

  destroy(): void {}
}
