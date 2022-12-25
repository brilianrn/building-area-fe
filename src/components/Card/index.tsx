import React, { FC } from 'react';
import './Card.style.css';
import { CardFooterProps, CardHeaderProps, CardProps } from './Card.type';

const CardHeader: FC<CardHeaderProps> = ({
  children,
  noSeparator,
  onClose,
}) => {
  return (
    <header className={noSeparator ? 'header-without-separator' : 'header'}>
      <div className="grid grid-cols-12">
        <div className="col-span-1" />
        <div className="text-center col-span-10">{children}</div>
        <div className="w-full col-span-1">
          {onClose && (
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/IconCross.svg`}
              onClick={onClose}
              className="float-right cursor-pointer"
              alt="icon-close"
            />
          )}
        </div>
      </div>
      <hr className="hr" />
    </header>
  );
};

const Card = ({ children }: CardProps) => {
  return (
    <React.Fragment>
      <div className="wrapper">{children}</div>
    </React.Fragment>
  );
};

const CardFooter: FC<CardFooterProps> = ({
  children,
  btnPositions,
  customClass,
}) => {
  return (
    <footer
      className={`footer ${
        btnPositions === 'start'
          ? 'flex justify-start'
          : btnPositions === 'center'
          ? 'flex justify-center'
          : 'flex justify-end'
      } ${customClass}`}
    >
      {children}
    </footer>
  );
};

Card.Header = CardHeader;
Card.Footer = CardFooter;

export default Card;
