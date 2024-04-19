import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import MultiDropdown, { Option } from 'components/MultiDropdown';

type Category = {
  id: number;
  name: string;
};
const Filter = () => {
  const currentValues: Option[] = [];
  const [categories, setCategories] = useState<Option[]>([]);
  const getCategories = useCallback(async () => {
    try {
      const response = await axios.get('https://api.escuelajs.co/api/v1/categories');
      const categoriesData: Category[] = response.data;
      setCategories(categoriesData.map((item) => ({ key: item.id, value: item.name })));
    } catch (error) {
      /** */
    }
  }, [setCategories]);
  useEffect(() => {
    getCategories();
  }, [getCategories]);
  return <MultiDropdown options={categories} value={currentValues} onChange={() => {}} getTitle={() => 'Filter'} />;
};

export default Filter;
