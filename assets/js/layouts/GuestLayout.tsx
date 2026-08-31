import React from 'react';

interface GuestLayoutProps {
  children: React.ReactNode;
}

export default function GuestLayout({ children }: GuestLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Page Content */}
      {children}
    </div>
  );
}
