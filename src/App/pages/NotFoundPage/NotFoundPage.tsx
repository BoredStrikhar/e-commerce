import React from 'react';
import LinkButton from 'components/LinkButton';
import Text from 'components/Text';
import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  return (
    <div className={styles['not-found-page']}>
      <Text tag="h1" weight="bold">
        Error: 404 Page Not Found
      </Text>
      <LinkButton className={styles['link']} to="/" background="accent">
        Main Page
      </LinkButton>
    </div>
  );
};

export default NotFoundPage;
