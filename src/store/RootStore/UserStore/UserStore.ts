import axios from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { UserApi, UserLoginApi, UserLoginModel, UserModel } from 'store/models/User';
import { Meta } from 'utils/meta';

type PrivateFields = '_user' | '_meta' | '_error';

export class UserStore {
  private _user: UserModel = { name: '', email: '', password: '', avatar: '' };
  private _meta: Meta = Meta.initial;
  private _error: string = '';

  constructor() {
    makeObservable<UserStore, PrivateFields>(this, {
      _user: observable.ref,
      _meta: observable,
      _error: observable,
      user: computed,
      error: computed,
      meta: computed,
      signUp: action,
      signIn: action,
      getProfile: action,
    });
  }

  get user(): UserModel {
    return this._user;
  }

  logOut() {
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('access_token');
    this._user = { name: '', email: '', password: '', avatar: '' };
  }

  get error(): string {
    return this._error;
  }

  get meta(): Meta {
    return this._meta;
  }

  async signUp(params: UserApi, navigate: () => void): Promise<void> {
    this._meta = Meta.loading;

    const response = await axios<UserApi>({
      method: 'post',
      url: 'https://api.escuelajs.co/api/v1/users/',
      data: params,
    });

    if (!response.data) {
      this._meta = Meta.error;
      return;
    }

    runInAction(() => {
      try {
        this._meta = Meta.success;
        this._user = response.data;
        this.signIn(
          {
            email: this._user.email,
            password: this._user.password,
          },
          navigate,
        );
        return;
      } catch (e) {
        this._meta = Meta.error;
      }
    });
  }

  async signIn(params: UserLoginModel, navigate?: () => void): Promise<void> {
    this._meta = Meta.loading;
    this._error = '';

    try {
      const response = await axios<UserLoginApi>({
        method: 'post',
        url: 'https://api.escuelajs.co/api/v1/auth/login',
        data: params,
      });

      if (response.data.access_token) {
        runInAction(() => {
          this._meta = Meta.success;
          localStorage.setItem('access_token', response.data.access_token);
          localStorage.setItem('refresh_token', response.data.refresh_token);
          if (navigate) {
            navigate();
          }
          return;
        });
      }
    } catch (e) {
      this._error = JSON.stringify(e);
      this._meta = Meta.error;
      return;
    }
  }

  async getProfile(): Promise<void> {
    this._meta = Meta.loading;
    if (localStorage.getItem('access_token')) {
      try {
        const response = await axios<UserApi>({
          method: 'get',
          url: 'https://api.escuelajs.co/api/v1/auth/profile',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        if (response.data) {
          runInAction(() => {
            this._meta = Meta.success;
            this._user = response.data;
            return;
          });
        }
      } catch (e) {
        this._error = JSON.stringify(e);
        this._meta = Meta.error;
        return;
      }
    }
  }

  destroy(): void {}
}
