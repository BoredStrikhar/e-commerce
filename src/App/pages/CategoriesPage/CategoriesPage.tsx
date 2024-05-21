import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Text from 'components/Text';
import CategoriesStore from 'store/CategoriesStore';
import { Meta } from 'utils/meta';
import { useLocalStore } from 'utils/useLocalStore';
import LoaderPage from '../LoaderPage';
import s from './CategoriesPage.module.scss';

const CategoriesPage = () => {
  const categoriesStore = useLocalStore(() => new CategoriesStore());

  const navigate = useNavigate();

  useEffect(() => {
    categoriesStore.getCategoriesList();
  }, []);

  const categories = categoriesStore.list;

  const handleCategoryClick = useCallback(
    (id: number) => {
      navigate(`/?categoryId=${id}`);
    },
    [navigate],
  );

  if (categoriesStore.meta === Meta.loading) {
    return <LoaderPage />;
  }

  return (
    <div className={s['categories-wrapper']}>
      <Text tag="h1" view="title">
        Categories
      </Text>
      <div className={s['categories-grid']}>
        {categories.map((item) => (
          <div className={s['categories-grid__category']} key={item.id} onClick={() => handleCategoryClick(item.id)}>
            <img src={item.image} className={s['categories-grid__image']} />
            <Text view="p-20" className={s['categories-grid__title']}>
              {item.name}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default observer(CategoriesPage);
