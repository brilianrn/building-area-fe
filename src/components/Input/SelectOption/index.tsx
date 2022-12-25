import React, { FC, useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import { SelectOptionProps } from '../index.type';

export const animatedComponents = makeAnimated();

const SelectOption: FC<SelectOptionProps> = ({
  placeholder,
  isMulti,
  setValue,
  value,
  options,
  type = 'secondary',
  isShowWarning = false,
  label,
  useLabel = false,
  labelClassName,
  isClearable = false,
  closeMenuOnSelect = true,
  className,
  required,
  disbaled,
}) => {
  const [styles, setStyles] = useState<any>();

  useEffect(() => {
    const colorType =
      type === 'primary'
        ? '#302C82'
        : type === 'danger'
        ? 'rgb(220 38 38)'
        : type === 'success'
        ? 'rgb(22 163 74)'
        : type === 'info'
        ? 'rgb(8 145 178)'
        : type === 'secondary'
        ? 'rgb(87 83 78)'
        : type === 'warning'
        ? 'rgb(217 119 6)'
        : 'rgb(64 64 64)';

    const customStyles = {
      placeholder: (defaultStyles: any) => {
        return {
          ...defaultStyles,
          color: colorType,
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
        };
      },
      dropdownIndicator: (base: any) => ({
        ...base,
        color: colorType,
      }),
      control: (base: any, state: { isFocused: any }) => ({
        ...base,
        background: 'transparent',
        color: colorType,
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
        borderColor: colorType,
        borderRadius: '3px',
        maxHeight: 'auto',
        boxShadow: state.isFocused ? null : null,
        '&:hover': {
          borderColor: state.isFocused ? colorType : colorType,
        },
      }),
    };
    setStyles(customStyles);
  }, [type]);

  const onChangeValue = (prop: any) => {
    if (isMulti) return setValue(!prop?.length ? null : prop);
    return setValue(prop);
  };

  return (
    <React.Fragment>
      <div className="z-10">
        {label && useLabel && (
          <p className={`${labelClassName} label-input`}>
            {label}
            {required && <span className="text-danger-default">*</span>}
          </p>
        )}
        <Select
          closeMenuOnSelect={closeMenuOnSelect}
          components={animatedComponents}
          isMulti={isMulti}
          options={options}
          onChange={onChangeValue}
          placeholder={placeholder}
          styles={styles}
          isClearable={isClearable}
          value={value}
          className={`${className} w-full`}
          isDisabled={disbaled}
        />
        {isShowWarning && (
          <div className="text-[12px] text-danger-default">
            <i className="mb-3">* {label || 'Kolom ini'} tidak boleh kosong!</i>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default SelectOption;
