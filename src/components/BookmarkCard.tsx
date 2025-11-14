import React from 'react';
import { ExternalLink, Trash2, Edit3 } from 'lucide-react';
import { type Bookmark } from '@/types/index';

interface BookmarkCardProps {
  bookmark: Bookmark;
  onDelete?: (id: string) => void;
  onEdit?: (bookmark: Bookmark) => void;
}

export function BookmarkCard({ bookmark, onDelete, onEdit }: BookmarkCardProps) {
  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  return (
    <div className="group relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-4 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-800/50 transition-all duration-200 hover:border-gray-200 dark:hover:border-gray-700">
      {/* Main content */}
      <a
        href={bookmark.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block space-y-2"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {bookmark.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {getDomain(bookmark.url)}
            </p>
          </div>
          <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
        </div>
        
        {bookmark.tags && bookmark.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {bookmark.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md"
              >
                {tag}
              </span>
            ))}
            {bookmark.tags.length > 3 && (
              <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
                +{bookmark.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </a>

      {/* Action buttons */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
        {onEdit && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onEdit(bookmark);
            }}
            className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        )}
        {onDelete && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onDelete(bookmark.id);
            }}
            className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}