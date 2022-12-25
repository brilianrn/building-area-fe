import React, { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const onSubmitName = () => {
    window.open('https://my-profile-26627.web.app/');
  };
  return (
    <React.Fragment>
      {children}
      <footer className="text-center py-4 text-white bg-teal-700">
        <p className="text-center font-normal tracking-wide">
          Copyright © {new Date().getFullYear()}, Building Area
        </p>
        <p className="text-center tracking-wide">
          Powered by{' '}
          <span
            className="font-bold hover:cursor-pointer hover:text-gray-300"
            onClick={onSubmitName}
          >
            brilianrn
          </span>
        </p>
      </footer>
    </React.Fragment>
  );
};

export default Layout;
