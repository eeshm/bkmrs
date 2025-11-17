import React from 'react';
import { BookmarkIcon, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { EmLogoIcon } from '@/icons/logo';

interface EmptyStateProps {
  onAddClick: () => void;
}

export function EmptyState({ onAddClick }: EmptyStateProps) {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="max-w-lg mx-auto text-[15px] tracking-wide text-justify font-sans space-y-1.5">
        <h2 className="font-semibold text-gray-900 dark:text-white">
          Stash
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          A quiet home for your most valuable hyperlinks. You may, however, find more elegant solutions elsewhere
        </p>
        <h2 className="font-semibold text-gray-900 mt-6 dark:text-white">
          About
        </h2>
        <p className="text-gray-500 dark:text-gray-500">
          Created for personal needs and refined to personal sensibilities. Intentionally minimal, almost austere. It recognizes input types, enriches links with metadata, and keeps the experience firmly keyboard-first. Animations are discreet; performance, swift — or so it claims. No onboarding, no tracking, and never any ads.
        </p>
        <button
          onClick={onAddClick}
          className="cursor-pointer mt-6  text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-300 underline underline-offset-2"
        >
          Start Stashing →
        </button>
        
        <p className="text-gray-400 dark:text-gray-600 text-xs mt-8 pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <span>
            Inspired by{' '}
            <a 
              href="https://bmrks.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
            >
              Rauno's Bookmarks
            </a>
          </span>
          <a 
            href="https://eeshm.me" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-70 duration-300 transition-opacity cursor-pointer"
          >
            <EmLogoIcon className='size-6 stroke-gray-100 dark:stroke-gray-600'/>
          </a>
        </p>
      </div>
    </div>
  );
}
