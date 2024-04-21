import classNames from 'classnames';
import * as React from 'react';
import styles from './Text.module.scss';

export type TextProps = {
  className?: string;
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  weight?: 'normal' | 'medium' | 'bold';
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'accent' | 'white';
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
  const textView = styles[`text-${view}`];
  const textColor = styles[`text-${color}`];
  const textWeight = styles[`text-${weight}`];

  return (
    <Tag
      style={{
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        display: '-webkit-box',
        textOverflow: 'ellipsis',
      }}
      className={classNames(styles.text, textWeight, textColor, textView, className)}
      onClick={onClick}
    >
      {children}
    </Tag>
  );
};

export default Text;
