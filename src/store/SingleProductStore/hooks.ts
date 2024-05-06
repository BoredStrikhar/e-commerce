import * as React from 'react';
import SingleProductStore from 'store/SingleProductStore';

export const SingleProductStoreContext = React.createContext<SingleProductStore | null>(null);

export const useSingleProductStore = (): SingleProductStore => {
  const context = React.useContext(SingleProductStoreContext);

  if (!context) {
    throw new Error('useSingleProductStore must be used within SingleProductStoreContext');
  }

  return context;
};
