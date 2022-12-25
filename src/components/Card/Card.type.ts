import { ReactNode } from 'react';

export interface CardProps {
  border?: boolean;
  children?: ReactNode;
  centeredContent?: boolean;
  fullWidth?: boolean;
  noMargin?: boolean;
}

export interface CardHeaderProps extends CardProps {
  noSeparator?: boolean;
  onClose: () => void;
}

export interface CardFooterProps extends CardProps {
  btnPositions?: 'start' | 'center' | 'end';
  customClass?: string;
}
