import classNames from 'classnames';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Text from '../Text/Text';
import styles from './ProductCard.module.scss';

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
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
  productId: number;
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
  productId,
}) => {
  const navigate = useNavigate();
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      navigate(`/product/${productId}`);
      onClick?.(e);
    },
    [navigate, onClick, productId],
  );

  return (
    <div className={classNames(styles.card, className)} onClick={handleClick}>
      <img className={styles['card-image']} src={image} alt="product"></img>
      <div className={styles['card-body']}>
        <div>
          {captionSlot && (
            <Text className={styles['caption-slot']} view="p-14" color="secondary">
              {captionSlot}
            </Text>
          )}
          <Text className={styles['card-title']} view="p-20" weight="bold" maxLines={2}>
            {title}
          </Text>
          <Text className={styles['card-subtitle']} view="p-16" color="secondary" maxLines={3} weight="normal">
            {subtitle}
          </Text>
        </div>
        <div className={styles['card-footer']}>
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
