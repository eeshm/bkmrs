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
      {/* Bookmarks Grid */}
      {bookmarks.length > 0 ? (
        <div className="flex flex-wrap space-x-2 space-y-2 justify-evenly px-4">
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
            Nothing found for "{searchQuery}"
          </p>
          <button
            onClick={onClearSearch}
            className=" text-gray-600 dark:text-gray-400 transition-all duration-400 underline underline-offset-2 hover:text-black hover:cursor-pointer mt-2"
          >
            Clear search
          </button>
        </div>
      ) : null}
    </>
  );
}
