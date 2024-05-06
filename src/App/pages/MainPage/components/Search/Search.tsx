import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from 'components/Button';
import Input from 'components/Input';
import { useProductsStore } from 'store/ProductsStore/hooks';
import s from './Search.module.scss';

const Search = () => {
  const productsStore = useProductsStore();
  const [searchParams, setSearchParams] = useSearchParams('');
  const [currentValue, setCurrentValue] = useState(searchParams.get('search') || '');

  useEffect(() => {
    setCurrentValue(productsStore.search);
  }, [productsStore.search]);

  const handleChange = useCallback((value: string) => {
    setCurrentValue(value);
  }, []);

  const handleButtonClick = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ search: currentValue, categoryId: productsStore.currentCategory.key.toString() });
  };

  return (
    <form className={s['search']} onSubmit={handleButtonClick}>
      <Input placeholder="Search product" value={currentValue} onChange={handleChange}></Input>
      <Button className={s['search__button']} type="submit">
        Find now
      </Button>
    </form>
  );
};

export default observer(Search);
