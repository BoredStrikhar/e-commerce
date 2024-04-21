import classNames from 'classnames';
import * as React from 'react';
import styles from './Loader.module.scss';

export type LoaderProps = {
  size?: 's' | 'm' | 'l';
  className?: string;
  color?: string;
};

const Loader: React.FC<LoaderProps> = ({ size = 'l', className, color = '--loader-bg' }) => {
  const containerSize = styles[`container-${size}`];
  const loaderSize = styles[`loader-${size}`];

  return (
    <div className={classNames(styles['loader-container'], containerSize, className)}>
      <div
        className={classNames(styles['loader'], loaderSize)}
        style={{
          borderColor: `var(${color})`,
          borderBottomColor: 'transparent',
        }}
      />
    </div>
  );
};

export default Loader;
