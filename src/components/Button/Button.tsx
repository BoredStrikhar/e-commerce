import classNames from 'classnames';
import * as React from 'react';
import Loader from 'components/Loader';
import Text from 'components/Text';
import styles from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ className, loading, children, ...props }) => {
  return (
    <button
      {...props}
      disabled={props.disabled || loading}  
      className={classNames(className, styles['button'], { [styles['button-loading']]: loading && !props.disabled })}
    >
      {loading ? (
        <>
          <Loader size="s" color="--button-primary-text"></Loader>
          <Text className={classNames(styles['button-text'], styles['button-text-margin'])}>{children}</Text>
        </>
      ) : (
        <span className={styles['button-text']}>{children}</span>
      )}
    </button>
  );
};

export default Button;
