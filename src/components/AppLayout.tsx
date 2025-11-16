import React from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <main className="w-full">
        {children}
      </main>
    </div>
  );
}
