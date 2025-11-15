import React from 'react';
import { ExternalLink, Trash2, Edit3 } from 'lucide-react';
import { type Bookmark } from '@/types/index';
import { motion } from 'motion/react';
import { TrashIcon123 } from '@/icons/logo';

interface BookmarkCardProps {
  bookmark: Bookmark;
  onDelete?: (id: string) => void;
  onEdit?: (bookmark: Bookmark) => void;
  editMode?: 'edit' | 'delete' | null;
}

export function BookmarkCard({ bookmark, onDelete, onEdit, editMode }: BookmarkCardProps) {
  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  return (
    <motion.div
      key={editMode}
      initial={editMode ? { x: 0 } : false}
      animate={editMode ? { x: [0, -8, 8, -8, 8, 0] } : { x: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="group relative bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-200 hover:border-gray-200 "
    >
      {/* Main content */}
      <a
        href={bookmark.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`block space-y-2 p-2 ${editMode ? 'pointer-events-none' : ''}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {bookmark.favicon && (
                <img
                  src={bookmark.favicon}
                  alt=""
                  className="w-5 h-5 rounded shrink-0"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
              <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {bookmark.title}
              </h3>
            </div>
            <p className="text-sm text-gray-500">
              {getDomain(bookmark.url)}
            </p>
          </div>
          {!editMode && (
            <ExternalLink className="size-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
          )}
        </div>
        
        {bookmark.tags && bookmark.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {bookmark.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md"
              >
                {tag}
              </span>
            ))}
            {bookmark.tags.length > 3 && (
              <span className="px-2 py-1 text-xs text-gray-500">
                +{bookmark.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </a>

      {/* Action buttons - Show only in edit/delete mode */}
      {editMode && (
        <div className="absolute top-1 right-1">
          {editMode === 'edit' && onEdit && (
            <button
              onClick={() => onEdit(bookmark)}
              className="flex-1 cursor-pointer text-black transition-colors "
            >
              <Edit3 className="size-3" />
            </button>
          )}
          {editMode === 'delete' && onDelete && (
            <button
              onClick={() => onDelete(bookmark.id)}
              className="flex- text-red-500  transition-colors cursor-pointer"
            >
              <TrashIcon123 className="size-4" />
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}