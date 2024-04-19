import * as React from 'react';
import './Text.css';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
  onClick?: () => void;
  datatestid?: string;
};

const Text: React.FC<TextProps> = ({
  className,
  view,
  tag = 'p',
  weight = 'normal',
  color = 'inherit',
  maxLines,
  children,
  onClick,
}) => {
  const Tag = tag;

  return (
    <Tag
      style={{
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        display: '-webkit-box',
        textOverflow: 'ellipsis',
      }}
      className={`text ${className} text-${weight} text-${view} text-${color} text-${weight}`}
      onClick={onClick}
    >
      {children}
    </Tag>
  );
};

export default Text;