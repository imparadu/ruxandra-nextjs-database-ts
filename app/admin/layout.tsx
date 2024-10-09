import AdminNav from '@/components/AdminNav';
import React from 'react';

type SpecialLayoutProps = {
  children: React.ReactNode;
};

export default function SpecialLayout({ children }: SpecialLayoutProps) {
  return (
    <>

    <AdminNav />
      {children}

    </>
  );
}
