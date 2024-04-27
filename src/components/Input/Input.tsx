import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import s from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  value: string;
  onChange: (value: string) => void;
  afterSlot?: React.ReactNode;
};

const Input: React.FC<InputProps> = ({ className, value, onChange, afterSlot, ...rest }) => {
  return (
    <div className={cn(s['input-container'], className)}>
      <input
        className={s['input']}
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

export default observer(Input);
