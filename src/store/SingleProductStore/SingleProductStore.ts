import axios from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { matchPath } from 'react-router-dom';
import { ProductApi, ProductModel, normalizeProduct } from 'store/models/Product';
import Collection from 'store/models/shared/collections';
import { Meta } from 'utils/meta';
import { ILocalStore } from 'utils/useLocalStore';

type PrivateFields = '_product' | '_meta' | '_category' | '_relatedProducts';

export default class SingleProductStore implements ILocalStore {
  private _product: Collection<number, ProductModel> = new Collection<number, ProductModel>(
    [],
    (element) => element.id,
  );
  private _meta: Meta = Meta.initial;
  private _category: number = 0;
  private _relatedProducts: Collection<number, ProductModel> = new Collection<number, ProductModel>(
    [],
    (element) => element.id,
  );
  id: number = 0;

  constructor() {
    makeObservable<SingleProductStore, PrivateFields>(this, {
      _product: observable,
      _meta: observable,
      _category: observable,
      _relatedProducts: observable,
      id: observable,
      product: computed,
      meta: computed,
      category: computed,
      relatedProducts: computed,
      getProduct: action,
      getRelatedProducts: action,
    });

    this.id = Number(matchPath('/product/:id', window.location.pathname)?.params.id);
  }

  get product(): ProductModel {
    return this._product.linearize()[0];
  }

  get meta(): Meta {
    return this._meta;
  }

  get category(): number {
    return this._category;
  }

  get relatedProducts(): ProductModel[] {
    return this._relatedProducts.linearize();
  }

  async getProduct(): Promise<void> {
    this._meta = Meta.loading;
    this._product.clear();
    const id = this.id;
    const response = await axios<ProductApi>({
      method: 'get',
      url: `https://api.escuelajs.co/api/v1/products/${id}`,
    });

    runInAction(() => {
      if (!response.data) {
        this._meta = Meta.error;
      }
      try {
        this._meta = Meta.success;
        this._product.add(normalizeProduct([response.data]));
        this._category = this._product.linearize()[0].categoryId;
        return;
      } catch (e) {
        this._meta = Meta.error;
        this._product.clear();
      }
    });
  }

  async getRelatedProducts(): Promise<void> {
    this._meta = Meta.loading;
    this._relatedProducts.clear();
    const response = await axios<ProductApi[]>({
      method: 'get',
      url: `https://api.escuelajs.co/api/v1/products/`,
      params: {
        offset: 0,
        limit: 4,
        categoryId: this._category,
      },
    });

    runInAction(() => {
      try {
        const result = [...response.data]
          .filter((product) => product.id !== this.id)
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value);
        result.length = Math.min(result.length, 3);
        this._relatedProducts.add(normalizeProduct(result));
        this._meta = Meta.success;
        return;
      } catch (e) {
        this._meta = Meta.error;
        this._relatedProducts.clear();
      }
    });
  }

  destroy(): void {}
}
