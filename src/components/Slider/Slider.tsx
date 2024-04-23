import cn from 'classnames';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SliderNavButtons from 'components/Slider/components/SliderNavButtons';
import s from './Slider.module.scss';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

export type SliderProps = {
  images: string[];
  className?: string;
};

const Slider: React.FC<SliderProps> = ({ images, className }) => {
  return (
    <Swiper className={cn(s['slider'], className)} spaceBetween={50} slidesPerView={1}>
      <SliderNavButtons />
      {images.map((image) => {
        return (
          <SwiperSlide key={image}>
            <img className={s['slider__product-image']} src={image} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Slider;
