import React from 'react';
import Loader from 'components/Loader';
import s from './LoaderPage.module.scss';

const LoaderPage = () => {
  return (
    <div className={s['loader-page']}>
      <Loader size="l" color="green"></Loader>
    </div>
  );
};

export default LoaderPage;
