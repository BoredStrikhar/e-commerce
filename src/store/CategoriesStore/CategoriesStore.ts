import axios from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { CategoryApi, CategoryModel, normalizeCategory } from 'store/models/Category';
import Collection from 'store/models/shared/collections';
import { Meta } from 'utils/meta';
import { ILocalStore } from 'utils/useLocalStore';

type PrivateFields = '_list' | '_meta';

export default class CategoriesStore implements ILocalStore {
  private _list: Collection<number, CategoryModel> = new Collection<number, CategoryModel>([], (element) => element.id);
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
    return this._list.linearize();
  }

  get meta(): Meta {
    return this._meta;
  }

  async getCategoriesList(): Promise<void> {
    this._meta = Meta.loading;
    this._list.clear();
    const response = await axios<CategoryApi[]>({
      method: 'get',
      url: 'https://api.escuelajs.co/api/v1/categories',
    });
    if (!response.data) {
      this._meta = Meta.error;
      return;
    }

    runInAction(() => {
      try {
        this._meta = Meta.success;
        this._list.add(normalizeCategory(response.data));
        return;
      } catch (e) {
        this._meta = Meta.error;
        this._list.clear();
      }
    });
  }

  destroy(): void {}
}
