import React from 'react';
import { useOnboardingState } from '@/hooks/useOnboardingState';
// import { WelcomeScreen } from '@/components/WelcomeScreen';
import { ImportPrompt } from '@/components/ImportPrompt';
import { DashboardEmptyState } from '@/components/DashboardEmptyState';
import {type  Bookmark } from '@/types';

export default function App() {
  const { step, bookmarks, updateStep, addBookmarks, addBookmark } = useOnboardingState();

  const handleStartFresh = () => {
    updateStep('dashboard');
  };

  const handleImport = () => {
    updateStep('import');
  };

  const handleImportComplete = (importedBookmarks: Bookmark[]) => {
    addBookmarks(importedBookmarks);
    updateStep('dashboard');
  };

  const handleBack = () => {
    updateStep('welcome');
  };

  const handleSkipImport = () => {
    updateStep('dashboard');
  };

  const handleImportLater = () => {
    updateStep('import');
  };

  return (
    <>
      {/* {step === 'welcome' && (
        <WelcomeScreen
          onImport={handleImport}
          onStartFresh={handleStartFresh}
        />
      )} */}
      
      {step === 'import' && (
        <ImportPrompt
          onImportComplete={handleImportComplete}
          onBack={handleBack}
          onSkip={handleSkipImport}
        />
      )}
      
      {step === 'dashboard' && (
        <DashboardEmptyState
          bookmarks={bookmarks}
          onAddBookmark={addBookmark}
          onImportLater={handleImportLater}
        />
      )}
    </>
  );
}