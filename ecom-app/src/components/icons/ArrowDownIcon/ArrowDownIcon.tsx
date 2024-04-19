import * as React from 'react';
import Icon, { IconProps } from '../Icon';

const ArrowDownIcon: React.FC<IconProps> = ({
  className,
  color = 'inherit',
  width = '24px',
  height = '24px',
}) => {
  const fillColor =
    color === 'primary'
      ? '#000'
      : color === 'secondary'
      ? '#afadb5'
      : color === 'accent'
      ? '#518581'
      : 'inherit';
  return (
    <Icon
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z"
        fill={fillColor}
      />
    </Icon>
  );
};

export default ArrowDownIcon;