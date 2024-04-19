import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from 'App/pages/MainPage/components/ProductGrid';
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
  product: Product;
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
  product,
}) => {
  return (
    <Link to={`/product/${product.id}`} className={`${styles.card_container} ${className}`} onClick={onClick}>
      <div className={styles.card}>
        <img className={styles.card_image} src={image} alt="product"></img>
        <div className={styles.card_body}>
          <div>
            {captionSlot && <p className={styles.caption_slot}>{captionSlot}</p>}
            <Text className={styles.card_title} weight="bold" maxLines={2}>
              {title}
            </Text>
            <Text className={styles.card_subtitle} maxLines={3} weight="normal">
              {subtitle}
            </Text>
          </div>
          <div className={styles.card_footer}>
            <p className={styles.content_slot}>{contentSlot}</p>
            {actionSlot}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
