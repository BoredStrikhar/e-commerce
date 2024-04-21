import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import { Category } from './types';
import { normalize } from './utilities';

const Filter = () => {
  const currentValues: Option[] = [];
  const [categories, setCategories] = useState<Option[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get('https://api.escuelajs.co/api/v1/categories');
        const categoriesData: Category[] = response.data;
        setCategories(normalize(categoriesData));
      } catch (error) {
        /** */
      }
    };
    getCategories();
  }, []);

  return <MultiDropdown options={categories} value={currentValues} onChange={() => {}} getTitle={() => 'Filter'} />;
};

export default Filter;
