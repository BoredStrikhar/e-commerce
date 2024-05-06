import axios from 'axios';
import { IReactionDisposer, action, computed, makeObservable, observable, reaction, runInAction } from 'mobx';
import { Option } from 'components/Dropdown';
import rootStore from 'store/RootStore';
import { ProductApi, ProductModel, normalizeProduct } from 'store/models/Product';
import Collection from 'store/models/shared/collections';
import { Meta } from 'utils/meta';
import { ILocalStore } from 'utils/useLocalStore';
import { GetProductsListParams, IProductsStore } from './types';

type PrivateFields = '_list' | '_meta' | '_currentCategory' | '_offset' | '_currentPage';

export default class ProductsStore implements IProductsStore, ILocalStore {
  private _list: Collection<number, ProductModel> = new Collection<number, ProductModel>([], (element) => element.id);
  private _meta: Meta = Meta.initial;
  private _currentCategory: Option = { key: 0, value: '' };
  private _offset: number = 0;
  private _currentPage: number = 0;
  search: string = '';
  hasMore: boolean = true;

  constructor() {
    makeObservable<ProductsStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      _currentCategory: observable,
      _offset: observable,
      _currentPage: observable,
      search: observable,
      hasMore: observable,
      list: computed,
      meta: computed,
      currentCategory: computed,
      offset: computed,
      currentPage: computed,
      getProductsList: action,
      fetchMoreProducts: action,
    });

    const initialSearch = rootStore.query.getParam('search');

    if (initialSearch) {
      this.search = initialSearch.toString();
    }

    const initialCategoryId = rootStore.query.getParam('categoryId');

    if (initialCategoryId) {
      this._currentCategory.key = Number(initialCategoryId.toString());
    }

    const initialPage = rootStore.query.getParam('currentPage');
    if (initialPage) {
      this._currentPage = Number(initialPage.toString());
    }
  }

  get list(): ProductModel[] {
    return this._list.linearize();
  }

  get meta(): Meta {
    return this._meta;
  }

  get currentCategory(): Option {
    return this._currentCategory;
  }

  /**Установить текущую категорию в сторе (key, value)*/
  setCurrentCategory(category: Option) {
    this._currentCategory.key = category.key;
    this._currentCategory.value = category.value;
  }

  get offset(): number {
    return this._offset;
  }

  /**Установить оффсет в сторе*/
  setOffset(offset: number) {
    this._offset = offset;
  }

  get currentPage(): number {
    return this._currentPage;
  }

  set currentPage(page: number) {
    this._currentPage = page;
  }

  async getProductsList(params: GetProductsListParams): Promise<void> {
    this._meta = Meta.loading;
    this._list.clear();
    const response = await axios<ProductApi[]>({
      method: 'get',
      url: 'https://api.escuelajs.co/api/v1/products',
      params: {
        offset: this._list.length,
        limit: params.limit,
        title: this.search,
        categoryId: this._currentCategory.key,
      },
    });
    if (!response.data) {
      this._meta = Meta.error;
      return;
    }

    runInAction(() => {
      try {
        if (this._currentPage === 0) {
          this._currentPage = this._currentPage + 1;
        }

        this._meta = Meta.success;
        this._list.add(normalizeProduct(response.data));
        this._offset = this._offset + 9;
        return;
      } catch (e) {
        this._meta = Meta.error;
        this._list.clear();
      }
    });
  }

  async fetchMoreProducts(): Promise<void> {
    const response = await axios<ProductApi[]>({
      method: 'get',
      url: 'https://api.escuelajs.co/api/v1/products',
      params: {
        offset: this._list.length,
        limit: 9,
        title: this.search,
        categoryId: this._currentCategory.key,
      },
    });
    if (!response.data) {
      this._meta = Meta.error;
      return;
    }

    runInAction(() => {
      try {
        if (response.data.length < 9) {
          this.hasMore = false;
        }
        this._list.add(normalizeProduct(response.data));
        this._offset = this._offset + 9;
        this._currentPage = this._currentPage + 1;
        this._meta = Meta.success;
        return;
      } catch (e) {
        this._meta = Meta.error;
        this._list.clear();
      }
    });
  }

  destroy(): void {
    this._qpSearchReaction();
    this._qpCategoryReaction();
    this._qpCurrentPageReaction();
  }

  private readonly _qpSearchReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('search'),
    (search) => {
      if (search) {
        this.search = search.toString();
        return;
      }
      this.search = '';
    },
  );

  private readonly _qpCategoryReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('categoryId'),
    (category) => {
      if (category) {
        this._currentCategory.key = Number(category);
        return;
      }
      this._currentCategory.key = 0;
    },
  );

  private readonly _qpCurrentPageReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('currentPage'),
    (currentPage) => {
      if (currentPage) {
        this._currentPage = Number(currentPage.toString());
        return;
      }
      this._currentPage = 0;
    },
  );
}
