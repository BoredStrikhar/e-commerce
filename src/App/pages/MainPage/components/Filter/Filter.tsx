import MultiDropdown from 'components/MultiDropdown';
import { Option } from 'components/MultiDropdown';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

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
    } catch (error: any) {
      throw new Error(error.message);
    }
  }, [setCategories]);
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <MultiDropdown
      options={categories}
      value={currentValues}
      onChange={(currentValues) => {}}
      getTitle={(currentValues) => 'Filter'}
    />
  );
};

export default Filter;
