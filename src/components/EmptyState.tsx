import React from 'react';
import { BookmarkIcon, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onAddClick: () => void;
}

export function EmptyState({ onAddClick }: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <BookmarkIcon className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Your stash is empty
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Start building your personal collection of important links and resources.
        </p>
        <Button
          onClick={onAddClick}
          size="lg"
          className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 rounded-full px-8"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Your First Bookmark
        </Button>
      </div>
    </div>
  );
}
