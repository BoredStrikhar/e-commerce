import React from 'react';
import { Link } from 'react-router-dom';
import Text from 'components/Text';
import PaginationIcon from 'components/icons/PaginationIcon';
import styles from './BackButton.module.scss';

const BackButton = () => {
  return (
    <Link className={styles['back-link']} to="/">
      <PaginationIcon direction="left" fill="black" />
      <Text className={styles['back-title']} weight="normal" view="p-20">
        Назад
      </Text>
    </Link>
  );
};

export default BackButton;
