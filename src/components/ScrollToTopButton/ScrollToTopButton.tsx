import React, { useEffect, useState } from 'react';
import Button from 'components/Button';
import PaginationIcon from 'components/icons/PaginationIcon';
import s from './ScrollToTopButton.module.scss';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className={s['scroll-to-top']}>
      {isVisible && (
        <Button onClick={scrollToTop} className={s['scroll-to-top__button']}>
          <PaginationIcon direction="up" fill="white" />
        </Button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
