import cn from 'classnames';
import * as React from 'react';
import s from './Loader.module.scss';

export type LoaderProps = {
  size?: 's' | 'm' | 'l';
  className?: string;
  color?: 'black' | 'green';
};

const Loader: React.FC<LoaderProps> = ({ size = 'l', className, color = 'green' }) => {
  return (
    <div className={cn(s['loader-container'], s[`loader-container_size_${size}`], className)}>
      <div className={cn(s['loader'], s[`loader_size_${size}`], s[`loader_color_${color}`])} />
    </div>
  );
};

export default Loader;
