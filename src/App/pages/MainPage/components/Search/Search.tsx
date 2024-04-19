import React, { useState } from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import styles from './Search.module.scss';

const Search = () => {
  const [currentInput, setCurrentInput] = useState('');
  return (
    <div className={styles.search_container}>
      <Input placeholder="Search product" value={currentInput} onChange={(e) => setCurrentInput(e)}></Input>
      <Button className={styles.search_button} onClick={() => {}}>
        Find now
      </Button>
    </div>
  );
};

export default Search;
