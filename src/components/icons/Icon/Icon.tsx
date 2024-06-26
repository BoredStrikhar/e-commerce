import cn from 'classnames';
import * as React from 'react';
import s from './Icon.module.scss';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  width?: string;
  height?: string;
  viewBox?: string;
  fill?: string;
  xmlns?: string;
  strokeWidth?: number;
  direction?: 'right' | 'left' | 'up' | 'down';
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  className,
  width = '24px',
  height = '24px',
  viewBox = '0 0 24 24',
  fill = 'none',
  xmlns = 'http://www.w3.org/2000/svg',
  children,
  strokeWidth,
  direction,
  ...props
}) => {
  return (
    <svg
      className={cn(s[`icon_${direction}`], className)}
      data-testid="icon"
      width={width}
      height={height}
      viewBox={viewBox}
      fill={fill}
      xmlns={xmlns}
      strokeWidth={strokeWidth}
      {...props}
    >
      {children}
    </svg>
  );
};

export default Icon;
