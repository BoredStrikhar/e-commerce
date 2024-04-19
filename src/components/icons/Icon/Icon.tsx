import * as React from 'react';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  width?: string;
  height?: string;
  viewBox?: string;
  fill?: string;
  xmlns?: string;
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  className,
  width = '24px',
  height = '24px',
  viewBox = '0 0 24 24',
  fill = 'none',
  xmlns = 'http://www.w3.org/2000/svg',
  children,
}) => {
  return (
    <svg
      className={className}
      data-testid="icon"
      width={width}
      height={height}
      viewBox={viewBox}
      fill={fill}
      xmlns={xmlns}
    >
      {children}
    </svg>
  );
};

export default Icon;
