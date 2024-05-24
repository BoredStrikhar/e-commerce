import React from 'react';
import LinkButton from 'components/LinkButton';
import Text from 'components/Text';
import s from './SuccessPage.module.scss';

const SuccessPage = () => {
  return (
    <div className={s['success-page']}>
      <Text tag="h1" weight="bold">
        Success! Check your order in your Profile
      </Text>
      <LinkButton className={s['success-page__link']} to="/profile" background="accent">
        Profile
      </LinkButton>
    </div>
  );
};

export default SuccessPage;
