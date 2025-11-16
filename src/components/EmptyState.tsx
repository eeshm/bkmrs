import React from 'react';
import { BookmarkIcon, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  onAddClick: () => void;
}

export function EmptyState({ onAddClick }: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <div className="size-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <BookmarkIcon className="size-5 text-gray-400" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
          Your stash is empty
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-[12px] mb-6">
          Start building your personal collection of important links and resources.
        </p>
        <Button
          onClick={onAddClick}
          size="lg"
          className={cn("bg-black  dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 rounded-lg",
            "hover:bg-black/90 hover:dark:bg-white/80",
            "transition-colors duration-300"
          )}
        >
          <Plus className="size-4" />
          Start
        </Button>
      </div>
    </div>
  );
}
