import React, { useMemo } from 'react';

export interface ButtonWithIconProps {
  rightIcon?: boolean;
  label: string;
  icon?: string;
  className?: string;
  iconClassName?: string;
  type:
    | 'primary'
    | 'primary-blue'
    | 'danger'
    | 'success'
    | 'warning'
    | 'secondary'
    | 'info'
    | 'transparent';
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({
  label,
  rightIcon = true,
  icon,
  onClick,
  type = 'primary',
  className,
  iconClassName,
  disabled = false,
}: ButtonWithIconProps) => {
  const buttonColor = useMemo(() => {
    const result =
      type === 'primary'
        ? `text-white bg-[#302C82] focus:ring-blue-300 text-sm px-5 py-2.5 text-center ${
            disabled ? '' : 'hover:bg-blue-800'
          }`
        : type === 'primary-blue'
        ? `text-white bg-[#2861A1] focus:ring-blue-300 text-sm px-5 py-2.5 text-center ${
            disabled ? '' : 'hover:bg-blue-800'
          }`
        : type === 'danger'
        ? `text-white bg-[#90001A] focus:ring-[#90001A] text-sm px-5 py-2.5 text-center ${
            disabled ? '' : 'hover:bg-[#7C0017]'
          }`
        : type === 'success'
        ? `text-white bg-[#5B8E5F] focus:ring-[#5B8E5F] text-sm px-5 py-2.5 text-center ${
            disabled ? '' : 'hover:bg-[#517C52]'
          }`
        : type === 'info'
        ? `text-white bg-cyan-700 focus:ring-cyan-300 text-sm px-5 py-2.5 text-center ${
            disabled ? '' : 'hover:bg-cyan-800'
          }`
        : type === 'secondary'
        ? `text-white bg-stone-700 focus:ring-stone-300 text-sm px-5 py-2.5 text-center ${
            disabled ? '' : 'hover:bg-stone-800'
          }`
        : type === 'warning'
        ? `text-white bg-amber-700 focus:ring-amber-300 text-sm px-5 py-2.5 text-center ${
            disabled ? '' : 'hover:bg-amber-800'
          }`
        : `bg-transparent text-sm text-center ${
            disabled ? '' : 'hover:opacity-[0.5]'
          }`;
    return result;
  }, [type, disabled]);

  return (
    <React.Fragment>
      <button
        onClick={onClick}
        type="button"
        className={`${buttonColor} ${className} ${
          disabled ? ' opacity-50 cursor-not-allowed' : ''
        } focus:outline-none font-medium rounded-[3px] w-full`}
        disabled={disabled}
      >
        {!rightIcon && icon && (
          <img
            src={icon}
            alt="icon"
            className={`${iconClassName || 'h-3 w-5'}`}
          />
        )}
        {label}
        {rightIcon && icon && (
          <img
            src={icon}
            alt="icon"
            className={`${iconClassName || 'h-3 w-5'}`}
          />
        )}
      </button>
    </React.Fragment>
  );
};

export default Button;
