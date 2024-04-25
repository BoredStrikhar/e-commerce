import * as React from 'react';
import ProductsStore from 'store/ProductsStore';

export const ProductsStoreContext = React.createContext<ProductsStore | null>(null);

export const useProductsStore = (): ProductsStore => {
  const context = React.useContext(ProductsStoreContext);

  if (!context) {
    throw new Error('useCategoriesStore must be used within ProductsStoreContext');
  }

  return context;
};
