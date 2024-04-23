import cn from 'classnames';
import * as React from 'react';
import Loader from 'components/Loader';
import s from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ className, loading, children, ...props }) => {
  return (
    <button {...props} disabled={props.disabled || loading} className={cn(s['button'], className)}>
      {loading && <Loader size="s" color="green"></Loader>}
      <span>{children}</span>
    </button>
  );
};

export default Button;
