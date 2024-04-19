import * as React from 'react';
import Icon, { IconProps } from 'components/icons/Icon';

const PaginationNextIcon: React.FC<IconProps> = ({
  className,
  width = '32px',
  height = '32px',
  viewBox = '0 0 32 32',
  fill = 'none',
  xmlns = 'http://www.w3.org/2000/svg',
}) => {
  return (
    <Icon className={className} width={width} height={height} viewBox={viewBox} fill={fill} xmlns={xmlns}>
      <path
        d="M11.88 26.5599L20.5733 17.8666C21.6 16.8399 21.6 15.1599 20.5733 14.1333L11.88 5.43994"
        stroke="#151411"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export default PaginationNextIcon;
