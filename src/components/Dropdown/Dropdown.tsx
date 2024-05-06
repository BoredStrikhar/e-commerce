import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import Input from 'components/Input';
import Text from 'components/Text';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import s from './Dropdown.module.scss';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: number;
  /** Значение варианта, отображается пользователю */
  value: string;
};

export type DropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option;
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option) => string;
};

const Dropdown: React.FC<DropdownProps> = ({ className, options, value, onChange, disabled, getTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [currentInput, setCurrentInput] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  const handleInputChange = (inputValue: string) => {
    if (value.value) {
      return;
    }

    setCurrentInput(inputValue);

    const newFilteredOptions = options.filter((option) =>
      option.value.toLowerCase().startsWith(inputValue.toLowerCase()),
    );
    setFilteredOptions(newFilteredOptions);
  };

  const handleOptionClick = (option: Option) => {
    if (value.key === option.key) {
      onChange({ key: 0, value: '' });
      setCurrentInput('');
      setIsOpen(false);
      return;
    }
    onChange(option);
    setIsOpen(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options, setFilteredOptions]);

  return (
    <div className={cn(s['dropdown'], className)} ref={dropdownRef}>
      <form onClick={() => !disabled && setIsOpen(true)}>
        <Input
          type="text"
          value={value.value ? getTitle(value) : currentInput}
          onChange={handleInputChange}
          placeholder={'Categories'}
          disabled={disabled}
          afterSlot={<ArrowDownIcon color="secondary"></ArrowDownIcon>}
        />
      </form>
      {isOpen && !disabled && (
        <div className={s['dropdown__options']}>
          {filteredOptions.map((option) => (
            <Text className={s['dropdown__option-text']} key={option.key} onClick={() => handleOptionClick(option)}>
              {option.value}
            </Text>
          ))}
        </div>
      )}
    </div>
  );
};

export default observer(Dropdown);
