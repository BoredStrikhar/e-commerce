import * as React from 'react';
import "./Button.css";
import Loader from 'components/Loader';
import Text from 'components/Text';
import classNames from 'classnames';



export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  className,
  loading,
  children,
  ...props
}) => {
  const buttonClasses = classNames(
    className,
    loading && !props.disabled ? 'button button-loading' : 'button'
  );
  return (
    <button
      {...props}
      disabled={props.disabled || loading}
      className={buttonClasses}
    >
      {loading ? (
        <>
          <Loader size="s" color="--button-primary-text"></Loader>
          <Text className="button-text button-text-margin">{children}</Text>
        </>
      ) : (
        <span className="button-text">{children}</span>
      )}
    </button>
  );
};

export default Button;