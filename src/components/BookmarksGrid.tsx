import React from 'react';
import { BookmarkCard } from '@/components/BookmarkCard';
import { type Bookmark } from '@/types/index';

interface BookmarksGridProps {
  bookmarks: Bookmark[];
  searchQuery: string;
  onEdit: (bookmark: Bookmark) => void;
  onDelete: (id: string) => void;
  onClearSearch: () => void;
  editMode?: 'edit' | 'delete' | null;
}

export function BookmarksGrid({
  bookmarks,
  searchQuery,
  onEdit,
  onDelete,
  onClearSearch,
  editMode,
}: BookmarksGridProps) {
  return (
    <>
      {/* Search Results Info */}
      {searchQuery && (
        <div className="mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {bookmarks.length} result{bookmarks.length !== 1 ? 's' : ''} for "{searchQuery}"
          </p>
        </div>
      )}

      {/* Bookmarks Grid */}
      {bookmarks.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bookmarks.map((bookmark) => (
            <BookmarkCard
              key={bookmark.id}
              bookmark={bookmark}
              onEdit={onEdit}
              onDelete={onDelete}
              editMode={editMode}
            />
          ))}
        </div>
      ) : searchQuery ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No bookmarks found matching "{searchQuery}"
          </p>
          <button
            onClick={onClearSearch}
            className="text-blue-600 dark:text-blue-400 hover:underline mt-2"
          >
            Clear search
          </button>
        </div>
      ) : null}
    </>
  );
}
