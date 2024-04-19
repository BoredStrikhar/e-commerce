import * as React from 'react';
import './Loader.css';

export type LoaderProps = {
  /** Размер */
  size?: 's' | 'm' | 'l';
  /** Дополнительный класс */
  className?: string;
  color?: string;
};

const Loader: React.FC<LoaderProps> = ({
  size = 'l',
  className,
  color = '--loader-bg',
}) => {
  return (
    <div
      className={`loader-container container-${size} ${className}`}
      data-testid="loader"
    >
      <div
        className={`loader loader-${size} `}
        style={{
          borderTopColor: `var(${color})`,
          borderRightColor: `var(${color})`,
          borderLeftColor: `var(${color})`,
          borderBottomColor: 'transparent',
        }}
      />
    </div>
  );
};

export default Loader;