import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import Input from 'components/Input';
import Text from 'components/Text';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import s from './MultiDropdown.module.scss';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: number;
  /** Значение варианта, отображается пользователю */
  value: string;
};

export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({ className, options, value, onChange, disabled, getTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [currentInput, setCurrentInput] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  const handleInputChange = (inputValue: string) => {
    if (value.length) {
      return;
    }

    setCurrentInput(inputValue);

    const newFilteredOptions = options.filter((option) =>
      option.value.toLowerCase().startsWith(inputValue.toLowerCase()),
    );
    setFilteredOptions(newFilteredOptions);
  };

  const handleOptionClick = (option: Option) => {
    const optionIndex = value.findIndex((item) => item.key === option.key);
    if (optionIndex !== -1) {
      onChange(value.slice(0, optionIndex).concat(value.slice(optionIndex + 1)));
      return;
    }
    onChange([...value, option]);
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
    <div className={cn(s['multi-dropdown'], className)} ref={dropdownRef}>
      <form onClick={() => !disabled && setIsOpen(true)}>
        <Input
          type="text"
          value={value.length ? getTitle(value) : currentInput}
          onChange={handleInputChange}
          placeholder={getTitle(value)}
          disabled={disabled}
          afterSlot={<ArrowDownIcon color="secondary"></ArrowDownIcon>}
        />
      </form>
      {isOpen && !disabled && (
        <div className={s['multi-dropdown__options']}>
          {filteredOptions.map((option) => (
            <Text
              className={s['multi-dropdown__option-text']}
              key={option.key}
              onClick={() => handleOptionClick(option)}
            >
              {option.value}
            </Text>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;
