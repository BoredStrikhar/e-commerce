import React, { useCallback, useState } from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import styles from './Search.module.scss';

const Search = () => {
  const [currentInput, setCurrentInput] = useState('');
  const handleChange = useCallback((e: React.SetStateAction<string>) => {
    setCurrentInput(e);
  }, []);
  return (
    <form className={styles['search-container']}>
      <Input placeholder="Search product" value={currentInput} onChange={(e) => handleChange(e)}></Input>
      <Button className={styles['search-button']} onClick={() => {}}>
        Find now
      </Button>
    </form>
  );
};

export default Search;
