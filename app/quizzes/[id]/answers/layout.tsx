import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <section className="p-4">{children}</section>
    </>
  );
}
