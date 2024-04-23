import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import { normalize } from './utilities';

const Filter = () => {
  const currentValues: Option[] = [];
  const [categories, setCategories] = useState<Option[]>([]);

  useEffect(() => {
    axios
      .get('https://api.escuelajs.co/api/v1/categories')
      .then((response) => {
        setCategories(normalize(response.data));
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          throw error;
        } else {
          throw new Error('Error while getting categories');
        }
      });
  }, []);

  return <MultiDropdown options={categories} value={currentValues} onChange={() => {}} getTitle={() => 'Filter'} />;
};

export default Filter;
