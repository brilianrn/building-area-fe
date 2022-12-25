export interface SelectOptionValue {
  value: string | number;
  label: string;
  color?: string;
  isFixed?: boolean;
  isDisabled?: boolean;
}

export interface SelectOptionProps {
  placeholder: string;
  value?: SelectOptionValue | SelectOptionValue[];
  setValue: (prop: SelectOptionValue) => void;
  isMulti: boolean;
  options?: Array<SelectOptionValue>;
  closeMenuOnSelect?: boolean;
  type?:
    | 'primary'
    | 'danger'
    | 'success'
    | 'warning'
    | 'secondary'
    | 'info'
    | 'dark';
  isShowWarning?: boolean;
  label?: string;
  useLabel?: boolean;
  isClearable?: boolean;
  labelClassName?: string;
  className?: string;
  required?: boolean;
  disbaled?: boolean;
}

export interface InputTextProps {
  label?: string;
  required?: boolean;
  labelClassName?: string;
  value?: string;
  setValue: (value: string) => void;
  placeholder: string;
  maxText?: number;
  isShowWarning?: boolean;
  readOnly?: boolean;
  useLabel?: boolean;
  icon?: string;
  iconPosition?: 'right' | 'left';
  iconClassName?: string;
  iconOnClick?: () => void;
  genre?:
    | 'primary'
    | 'danger'
    | 'success'
    | 'warning'
    | 'secondary'
    | 'info'
    | 'dark'
    | 'disable';
  type: 'text' | 'number' | 'email' | 'file' | 'date' | 'password';
  className?: string;
}
export interface FormDateProps {
  placeholder: string;
  value: Date | null;
  setValue: (prop: Date) => void;
  type?:
    | 'primary'
    | 'danger'
    | 'success'
    | 'warning'
    | 'secondary'
    | 'info'
    | 'dark';
  isShowWarning?: boolean;
  label?: string;
  useLabel?: boolean;
  labelClassName?: string;
  readOnly?: boolean;
  format?: 'dd-MM-yyyy' | 'dd MMMM yyyy' | 'yyyy';
  minDate?: Date;
  icon?: string;
  iconPosition?: string;
  showMonthDropdown?: boolean;
  showYearDropdown?: boolean;
}
