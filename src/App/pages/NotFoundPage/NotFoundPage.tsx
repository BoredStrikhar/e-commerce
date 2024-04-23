import React from 'react';
import LinkButton from 'components/LinkButton';
import Text from 'components/Text';
import s from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  return (
    <div className={s['not-found-page']}>
      <Text tag="h1" weight="bold">
        Error: 404 Page Not Found
      </Text>
      <LinkButton className={s['not-found-page__link']} to="/" background="accent">
        Main Page
      </LinkButton>
    </div>
  );
};

export default NotFoundPage;
