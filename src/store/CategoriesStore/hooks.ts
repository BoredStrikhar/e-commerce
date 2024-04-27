import * as React from 'react';
import CategoriesStore from 'store/CategoriesStore';

export const CategoriesStoreContext = React.createContext<CategoriesStore | null>(null);

export const useCategoriesStore = (): CategoriesStore => {
  const context = React.useContext(CategoriesStoreContext);

  if (!context) {
    throw new Error('useCategoriesStore must be used within CategoriesStoreContext');
  }

  return context;
};
