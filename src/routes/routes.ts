import MainPage from '../App/pages/MainPage';
import NotFoundPage from '../App/pages/NotFoundPage';
import ProductPage from '../App/pages/ProductPage';

export enum ERoutePathType {
  INDEX = '/',
  PRODUCT = '/product/:id',
  NOTFOUND = '*',
}

export const routeConfig = [
  {
    path: ERoutePathType.INDEX,
    element: MainPage,
  },
  {
    path: ERoutePathType.PRODUCT,
    element: ProductPage,
  },
  {
    path: ERoutePathType.NOTFOUND,
    element: NotFoundPage,
  },
];
