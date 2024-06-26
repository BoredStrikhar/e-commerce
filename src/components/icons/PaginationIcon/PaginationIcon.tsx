import * as React from 'react';
import Icon, { IconProps } from 'components/icons/Icon';

const PaginationIcon: React.FC<IconProps> = ({
  className,
  width = '32px',
  height = '32px',
  viewBox = '0 0 32 32',
  fill,
  strokeWidth,
  direction,
  ...props
}) => {
  return (
    <Icon
      className={className}
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      direction={direction}
      {...props}
    >
      <path
        d="M20.12 26.5599L11.4267 17.8666C10.4 16.8399 10.4 15.1599 11.4267 14.1333L20.12 5.43994"
        stroke={fill || '#AFADB5'}
        strokeWidth={strokeWidth || 1.5}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export default PaginationIcon;
