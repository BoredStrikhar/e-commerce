import React from 'react';
import styles from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  value: string;
  onChange: (value: string) => void;
  afterSlot?: React.ReactNode;
};

const Input: React.FC<InputProps> = ({ className, value, onChange, afterSlot, ...rest }) => {
  return (
    <div className={`${styles.input_container} ${className}`}>
      <input
        className={styles.input_inner}
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        {...rest}
      />
      {afterSlot || null}
    </div>
  );
};

export default Input;