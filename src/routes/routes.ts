import CartPage from '../App/pages/CartPage';
import MainPage from '../App/pages/MainPage';
import NotFoundPage from '../App/pages/NotFoundPage';
import ProductPage from '../App/pages/ProductPage';
import ProfilePage from '../App/pages/ProfilePage';
import SignInPage from '../App/pages/SignInPage';
import SignUpPage from '../App/pages/SignUpPage';

export enum ERoutePathType {
  INDEX = '/',
  PRODUCT = '/product/:id',
  NOTFOUND = '*',
  SIGNUP = '/signup',
  SIGNIN = '/signin',
  PROFILE = '/profile',
  CART = '/cart',
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
  {
    path: ERoutePathType.SIGNUP,
    element: SignUpPage,
  },
  {
    path: ERoutePathType.SIGNIN,
    element: SignInPage,
  },
  {
    path: ERoutePathType.PROFILE,
    element: ProfilePage,
  },
  {
    path: ERoutePathType.CART,
    element: CartPage,
  },
];
