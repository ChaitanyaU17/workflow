import React from 'react';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children, className = '' }) => (
  <main className={`page-wrapper ${className}`}>
    {children}
  </main>
);

export default PageWrapper;
