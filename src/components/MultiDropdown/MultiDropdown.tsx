import React, { useEffect, useRef, useState } from 'react';
import Input from 'components/Input';
import Text from 'components/Text';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import styles from './MultiDropdown.module.scss';

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

  // const handleRemoveOption = (option: Option) => {
  //   const newValue = value.filter((val) => val.key !== option.key);
  //   onChange(newValue);
  // };

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
    <div className={`${styles.multi_dropdown_container} ${className}`} ref={dropdownRef}>
      <Input
        type="text"
        value={value.length ? getTitle(value) : currentInput}
        onClick={() => !disabled && setIsOpen(true)}
        onChange={handleInputChange}
        placeholder={getTitle(value)}
        disabled={disabled}
        afterSlot={<ArrowDownIcon color="secondary"></ArrowDownIcon>}
      />

      {isOpen && !disabled && (
        <div className={styles.multi_dropdown_options}>
          {filteredOptions.map((option) => (
            <Text
              className={styles.multi_dropdown_option_text}
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
