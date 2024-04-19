import * as React from 'react';
import styles from './Loader.module.scss';

export type LoaderProps = {
  size?: 's' | 'm' | 'l';
  className?: string;
  color?: string;
};

const Loader: React.FC<LoaderProps> = ({ size = 'l', className, color = '--loader-bg' }) => {
  const containerSize = styles[`container_${size}`];
  const loaderSize = styles[`loader_${size}`];

  return (
    <div className={`${styles.loader_container} ${containerSize} ${className}`}>
      <div
        className={`${styles.loader} ${loaderSize}`}
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
