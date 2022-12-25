import React, { FC, useEffect, useState } from 'react';
import { InputTextProps } from '../index.type';
import './Text.style.css';

const Text: FC<InputTextProps> = ({
  label = null,
  labelClassName = '',
  value = '',
  setValue,
  placeholder = 'Masukkan teks',
  maxText = 120,
  isShowWarning = false,
  readOnly = false,
  useLabel = false,
  type = 'text',
  genre = 'secondary',
  icon,
  iconPosition = 'right',
  iconClassName,
  iconOnClick,
  className,
  required,
}) => {
  const [inputColor, setInputColor] = useState<string>();

  useEffect(() => {
    setInputColor(
      genre === 'primary'
        ? 'border-[#302C82] text-[#302C82] focus:ring-blue-300 placeholder-[#302C82]'
        : genre === 'danger'
        ? 'border-red-700 text-red-700 focus:ring-red-300 placeholder-red-700'
        : genre === 'success'
        ? 'border-green-700 text-green-700 focus:ring-green-300 placeholder-green-700'
        : genre === 'info'
        ? 'border-cyan-700 text-cyan-700 focus:ring-cyan-300 placeholder-cyan-700'
        : genre === 'secondary'
        ? 'border-stone-700 text-stone-700 focus:ring-stone-300 placeholder-stone-700'
        : genre === 'warning'
        ? 'border-amber-700 text-amber-700 focus:ring-amber-300 placeholder-amber-700'
        : genre === 'dark'
        ? 'border-gray-700 text-gray-700 focus:ring-gray-300 placeholder-gray-700'
        : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
    );
  }, [genre]);
  return (
    <React.Fragment>
      {label && useLabel && (
        <p className={`${labelClassName}`}>
          {label}
          {required && <span className="text-danger-default">*</span>}
        </p>
      )}
      <div className="relative">
        <input
          type={type === 'number' ? 'text' : type}
          className={`${inputColor} ${className} ${
            readOnly ? 'cursor-not-allowed' : ''
          } mb-0 border block w-full p-[8.2px] text-sm rounded-[3px]`}
          value={value || ''}
          onChange={(e) =>
            setValue(e.target.value?.length > maxText ? value : e.target.value)
          }
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={readOnly}
        />
        {icon && (
          <img
            src={icon}
            alt={`icon-${iconPosition}`}
            className={`${iconPosition}-icon ${iconClassName}`}
            onClick={iconOnClick}
          />
        )}
      </div>
      {isShowWarning && (
        <div className="text-[12px] text-danger-default">
          <i className="mb-3">* {label || 'Kolom ini'} tidak boleh kosong!</i>
        </div>
      )}
    </React.Fragment>
  );
};

export default Text;
