import React, { useState } from 'react';
import { useSwiper } from 'swiper/react';
import Button from 'components/Button';
import PaginationIcon from 'components/icons/PaginationIcon';
import s from './SliderNavButtons.module.scss';

const SliderNavButtons = () => {
  const swiper = useSwiper();
  const [isEnd, setIsEnd] = useState(swiper.isEnd);
  const [isBeginning, setisBeginning] = useState(swiper.isBeginning);

  const handleSlideNext = () => {
    swiper.slideNext();
    setIsEnd(swiper.isEnd);
    setisBeginning(swiper.isBeginning);
  };
  const handleSlidePrev = () => {
    swiper.slidePrev();
    setIsEnd(swiper.isEnd);
    setisBeginning(swiper.isBeginning);
  };

  return (
    <div className={s['slider-nav-buttons']}>
      <Button className={s['slider-nav-buttons__button']} disabled={isBeginning} onClick={handleSlidePrev}>
        <PaginationIcon direction="left" fill="white" strokeWidth={3} />
      </Button>
      <Button className={s['slider-nav-buttons__button']} disabled={isEnd} onClick={handleSlideNext}>
        <PaginationIcon direction="right" fill="white" strokeWidth={3} />
      </Button>
    </div>
  );
};

export default SliderNavButtons;
