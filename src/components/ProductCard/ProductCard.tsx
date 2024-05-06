import cn from 'classnames';
import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Text from '../Text/Text';
import s from './ProductCard.module.scss';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: () => void;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
  isLast?: boolean;
};

const ProductCard: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
  isLast,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [searchParams] = useSearchParams('');

  useEffect(() => {
    if (isLast && ref.current && searchParams.get('currentPage')) {
      ref.current.scrollIntoView();
    }
  }, []);

  return (
    <div className={cn(s['product-card'], className)} onClick={onClick} ref={ref}>
      <img className={s['product-card__image']} src={image} alt="product"></img>
      <div className={s['product-card__body']}>
        <div>
          {captionSlot && (
            <Text className={s['caption-slot']} view="p-14" color="secondary">
              {captionSlot}
            </Text>
          )}
          <Text className={s['product-card__title']} view="p-20" weight="bold" maxLines={2}>
            {title}
          </Text>
          <Text className={s['product-card__subtitle']} view="p-16" color="secondary" maxLines={3} weight="normal">
            {subtitle}
          </Text>
        </div>
        <div className={s['product-card__footer']}>
          <Text view="p-18" weight="bold">
            {contentSlot}
          </Text>
          {actionSlot}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
