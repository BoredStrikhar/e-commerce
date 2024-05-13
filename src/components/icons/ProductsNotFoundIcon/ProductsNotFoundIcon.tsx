import * as React from 'react';
import Icon, { IconProps } from '../Icon';

const ProductsNotFoundIcon: React.FC<IconProps> = ({
  className,
  width = '120px',
  height = '120px',
  viewBox = '0 0 20 20',
  fill = 'none',
  xmlns = 'http://www.w3.org/2000/svg',
}) => {
  return (
    <Icon className={className} width={width} height={height} viewBox={viewBox} fill={fill} xmlns={xmlns}>
        <path
          d="M9.5 6.5L5.5 10.5M0.5 2.5V12.5C0.5 13.0523 0.947715 13.5 1.5 13.5H13.5C14.0523 13.5 14.5 13.0523 14.5 12.5V4.5C14.5 3.94772 14.0523 3.5 13.5 3.5H7.5L5.5 1.5H1.5C0.947715 1.5 0.5 1.94772 0.5 2.5ZM7.5 11.5C5.84315 11.5 4.5 10.1569 4.5 8.5C4.5 6.84315 5.84315 5.5 7.5 5.5C9.15685 5.5 10.5 6.84315 10.5 8.5C10.5 10.1569 9.15685 11.5 7.5 11.5Z"
          stroke="#000000"
        />
    </Icon>
  );
};

export default ProductsNotFoundIcon;
