import React from 'react';
import { Link } from 'react-router-dom';
import Text from 'components/Text';
import PaginationIcon from 'components/icons/PaginationIcon';
import s from './BackButton.module.scss';

const BackButton = () => {
  return (
    <Link className={s['back-link']} to="/">
      <PaginationIcon direction="left" fill="black" />
      <Text className={s['back-link__title']} weight="normal" view="p-20">
        Назад
      </Text>
    </Link>
  );
};

export default BackButton;
