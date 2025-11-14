import { useState, useEffect } from 'react';
import type { OnboardingStep, Bookmark } from '@/types';

export function useOnboardingState() {
  const [step, setStep] = useState<OnboardingStep>('dashboard');
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    const savedStep = localStorage.getItem('stash_step');
    const savedBookmarks = localStorage.getItem('stash_bookmarks');
    
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
    localStorage.setItem('stash_step', newStep);
  };

  const addBookmarks = (newBookmarks: Bookmark[]) => {
    const updated = [...bookmarks, ...newBookmarks];
    setBookmarks(updated);
    localStorage.setItem('stash_bookmarks', JSON.stringify(updated));
  };

  const addBookmark = (bookmark: Bookmark) => {
    const updated = [...bookmarks, bookmark];
    setBookmarks(updated);
    localStorage.setItem('stash_bookmarks', JSON.stringify(updated));
  };

  const updateBookmark = (updatedBookmark: Bookmark) => {
    const updated = bookmarks.map(bookmark =>
      bookmark.id === updatedBookmark.id ? updatedBookmark : bookmark
    );
    setBookmarks(updated);
    localStorage.setItem('stash_bookmarks', JSON.stringify(updated));
  };

  const deleteBookmark = (id: string) => {
    const updated = bookmarks.filter(bookmark => bookmark.id !== id);
    setBookmarks(updated);
    localStorage.setItem('stash_bookmarks', JSON.stringify(updated));
  };

  const searchBookmarks = (query: string) => {
    if (!query.trim()) return bookmarks;
    
    const lowercaseQuery = query.toLowerCase();
    return bookmarks.filter(bookmark =>
      bookmark.title.toLowerCase().includes(lowercaseQuery) ||
      bookmark.url.toLowerCase().includes(lowercaseQuery) ||
      bookmark.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  };

  return {
    step,
    bookmarks,
    updateStep,
    addBookmarks,
    addBookmark,
    updateBookmark,
    deleteBookmark,
    searchBookmarks,
  };
}

