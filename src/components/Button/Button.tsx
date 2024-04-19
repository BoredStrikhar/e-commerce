import * as React from 'react';
import Loader from 'components/Loader';
import Text from 'components/Text';
import styles from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ className, loading, children, ...props }) => {
  return (
    <button
      {...props}
      disabled={props.disabled || loading}
      className={`${className} ${styles.button} ${loading && !props.disabled ? `${styles.button_loading}` : ``}`}
    >
      {loading ? (
        <>
          <Loader size="s" color="--button-primary-text"></Loader>
          <Text className={`${styles.button_text} ${styles.button_text_margin}`}>{children}</Text>
        </>
      ) : (
        <span className={styles.button_text}>{children}</span>
      )}
    </button>
  );
};

export default Button;
