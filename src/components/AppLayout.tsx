import React from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-dvh bg-white">
      <main className="w-full h-full">
        {children}
      </main>
    </div>
  );
}
