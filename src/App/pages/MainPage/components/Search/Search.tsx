import React, { useCallback, useState } from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import s from './Search.module.scss';

const Search = () => {
  const [currentInput, setCurrentInput] = useState('');
  const handleChange = useCallback((e: React.SetStateAction<string>) => {
    setCurrentInput(e);
  }, []);
  return (
    <form className={s['search']}>
      <Input placeholder="Search product" value={currentInput} onChange={(e) => handleChange(e)}></Input>
      <Button className={s['search__button']} onClick={() => {}}>
        Find now
      </Button>
    </form>
  );
};

export default Search;
