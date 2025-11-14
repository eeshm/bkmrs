import { useState, useEffect } from 'react';
import type { OnboardingStep, Bookmark } from '@/types';

export function useOnboardingState() {
  const [step, setStep] = useState<OnboardingStep>('dashboard');
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    const savedStep = localStorage.getItem('floatmark_step');
    const savedBookmarks = localStorage.getItem('floatmark_bookmarks');
    
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (e) {
        console.error('Failed to parse bookmarks:', e);
      }
    }
    
    if (savedStep && ['welcome', 'import', 'dashboard'].includes(savedStep)) {
      setStep(savedStep as OnboardingStep);
    }
  }, []);

  const updateStep = (newStep: OnboardingStep) => {
    setStep(newStep);
    localStorage.setItem('floatmark_step', newStep);
  };

  const addBookmarks = (newBookmarks: Bookmark[]) => {
    const updated = [...bookmarks, ...newBookmarks];
    setBookmarks(updated);
    localStorage.setItem('floatmark_bookmarks', JSON.stringify(updated));
  };

  const addBookmark = (bookmark: Bookmark) => {
    const updated = [...bookmarks, bookmark];
    setBookmarks(updated);
    localStorage.setItem('floatmark_bookmarks', JSON.stringify(updated));
  };

  return {
    step,
    bookmarks,
    updateStep,
    addBookmarks,
    addBookmark,
  };
}

