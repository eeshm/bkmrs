import React from 'react';
import { useOnboardingState } from '@/hooks/useOnboardingState';
import { ImportPrompt } from '@/components/ImportPrompt';
import { Dashboard } from '@/components/Dashboard';
import { type Bookmark } from '@/types';

export default function App() {
  const {
    step,
    bookmarks,
    updateStep,
    addBookmarks,
    addBookmark,
    updateBookmark,
    deleteBookmark,
    searchBookmarks,
  } = useOnboardingState();

  const handleImportComplete = (importedBookmarks: Bookmark[]) => {
    addBookmarks(importedBookmarks);
    updateStep('dashboard');
  };

  const handleBack = () => {
    updateStep('dashboard');
  };

  const handleSkipImport = () => {
    updateStep('dashboard');
  };

  return (
    <>      
      {step === 'import' && (
        <ImportPrompt
          onImportComplete={handleImportComplete}
          onBack={handleBack}
          onSkip={handleSkipImport}
        />
      )}
      
      {step === 'dashboard' && (
        <Dashboard
          bookmarks={bookmarks}
          onAddBookmark={addBookmark}
          onUpdateBookmark={updateBookmark}
          onDeleteBookmark={deleteBookmark}
          onSearchBookmarks={searchBookmarks}
          onImport={() => updateStep('import')}
        />
      )}
    </>
  );
}