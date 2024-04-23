import cn from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import Text from 'components/Text';
import PaginationIcon from 'components/icons/PaginationIcon';
import s from './Pagination.module.scss';

type PaginationProps = {
  productsQuantity: number;
  productsPerPage: number;
};

const Pagination: React.FC<PaginationProps> = ({ productsQuantity, productsPerPage }) => {
  return (
    <div className={s['product-pagination']}>
      <Link to="" className={cn(s['product-pagination__item'], s['product-pagination__item_position_back'])}>
        <PaginationIcon direction="left" />
      </Link>
      <Link to="" className={cn(s['product-pagination__item'], s['product-pagination__item_position_current'])}>
        <Text view="p-18">1</Text>
      </Link>
      <Link to="" className={s['product-pagination__item']}>
        <Text view="p-18">2</Text>
      </Link>
      <Link to="" className={s['product-pagination__item']}>
        <Text view="p-18">3</Text>
      </Link>
      <Link to="" className={s['product-pagination__item']}>
        <Text view="p-18">...</Text>
      </Link>
      <Link to="" className={s['product-pagination__item']}>
        <Text view="p-18">{Math.ceil(productsQuantity / productsPerPage)}</Text>
      </Link>
      <Link to="" className={cn(s['product-pagination__item'], s['product-pagination__item_position_next'])}>
        <PaginationIcon fill="#151411" direction="right" />
      </Link>
    </div>
  );
};

export default Pagination;
