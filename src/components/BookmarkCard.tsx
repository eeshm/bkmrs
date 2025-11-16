import React from 'react';
import { ExternalLink, Trash2, Edit3 } from 'lucide-react';
import { type Bookmark } from '@/types/index';
import { motion } from 'motion/react';
import { TrashIcon123 } from '@/icons/logo';
import { cn } from '@/lib/utils';

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
      animate={editMode ? { x: [0, -18, 18, -18, 18, 0]  , y: [0, -10, 10, -10, 10, 0]} : { x: 0 , y: 0 }}
      transition={{  ease:"easeInOut", duration: 0.12 }}
      whileHover={{ y: -8,rotate: 1 }}
      className={cn("group relative bg-white border w-auto h-9",
        "flex items-center justify border-gray-100 rounded-xl overflow-hidden max-w-xs",
         "shadow-[0_1px_5px_rgb(0,0,0,0.2)]"
        )}
    >
      {/* Main content */}
      <a
        href={bookmark.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center w-full gap-2 p-2 ${editMode ? 'pointer-events-none' : ''}`}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
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
          <h3 className="font-medium text-xs text-gray-900 group-hover:text-blue-600 transition-colors truncate">
            {bookmark.title}
          </h3>
        </div>
        <p className="text-[10px] text-gray-500 truncate shrink-0">
          {getDomain(bookmark.url)}
        </p>
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