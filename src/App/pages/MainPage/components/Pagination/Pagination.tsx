import React from 'react';
import { Link } from 'react-router-dom';
import Text from 'components/Text';
import PaginationIcon from 'components/icons/PaginationIcon';
import styles from './Pagination.module.scss';

type PaginationProps = {
  productsQuantity: number;
  productsPerPage: number;
};

const Pagination: React.FC<PaginationProps> = ({ productsQuantity, productsPerPage }) => {
  return (
    <div className={styles['product-pagination']}>
      <Link to="" className={`${styles['product-pagination-item']} ${styles.back}`}>
        <PaginationIcon direction="left" />
      </Link>
      <Link to="" className={`${styles['product-pagination-item']} ${styles.current}`}>
        <Text view="p-18">1</Text>
      </Link>
      <Link to="" className={styles['product-pagination-item']}>
        <Text view="p-18">2</Text>
      </Link>
      <Link to="" className={styles['product-pagination-item']}>
        <Text view="p-18">3</Text>
      </Link>
      <Link to="" className={styles['product-pagination-item']}>
        <Text view="p-18">...</Text>
      </Link>
      <Link to="" className={styles['product-pagination-item']}>
        <Text view="p-18">{Math.ceil(productsQuantity / productsPerPage)}</Text>
      </Link>
      <Link to="" className={`${styles['product-pagination-item']} ${styles.next}`}>
        <PaginationIcon fill="#151411" direction="right" />
      </Link>
    </div>
  );
};

export default Pagination;
