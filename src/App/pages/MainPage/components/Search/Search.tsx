import React, { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from 'components/Button';
import Input from 'components/Input';
import s from './Search.module.scss';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams('');
  const [currentValue, setCurrentValue] = useState(searchParams.get('search') || '');

  const handleChange = useCallback((e: string) => {
    setCurrentValue(e);
  }, []);

  const handleButtonClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSearchParams({ search: currentValue });
  };

  return (
    <form className={s['search']}>
      <Input placeholder="Search product" value={currentValue} onChange={handleChange}></Input>
      <Button className={s['search__button']} onClick={handleButtonClick}>
        Find now
      </Button>
    </form>
  );
};

export default Search;
