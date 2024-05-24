import AboutPage from '../App/pages/AboutPage';
import CartPage from '../App/pages/CartPage';
import CategoriesPage from '../App/pages/CategoriesPage';
import CheckoutPage from '../App/pages/CheckoutPage';
import MainPage from '../App/pages/MainPage';
import NotFoundPage from '../App/pages/NotFoundPage';
import ProductPage from '../App/pages/ProductPage';
import ProfilePage from '../App/pages/ProfilePage';
import SignInPage from '../App/pages/SignInPage';
import SignUpPage from '../App/pages/SignUpPage';
import SuccessPage from '../App/pages/SuccessPage';

export enum ERoutePathType {
  INDEX = '/',
  PRODUCT = '/product/:id',
  NOTFOUND = '*',
  SIGNUP = '/signup',
  SIGNIN = '/signin',
  PROFILE = '/profile',
  CART = '/cart',
  CHECKOUT = '/checkout',
  CATEGORIES = '/categories',
  ABOUT = '/about',
  SUCCESS = '/success'
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
  {
    path: ERoutePathType.CHECKOUT,
    element: CheckoutPage,
  },
  {
    path: ERoutePathType.CATEGORIES,
    element: CategoriesPage,
  },
  {
    path: ERoutePathType.ABOUT,
    element: AboutPage,
  },
  {
    path: ERoutePathType.SUCCESS,
    element: SuccessPage,
  },
];
