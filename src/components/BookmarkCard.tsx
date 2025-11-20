import React, { useState } from 'react';
import { Edit3 } from 'lucide-react';
import { type Bookmark } from '@/types/index';
import { motion, AnimatePresence } from 'motion/react';
import { TrashIcon123 } from '@/icons/logo';
import { cn } from '@/lib/utils';
import { TextScramble } from '@/components/ui/text-scramble';

interface BookmarkCardProps {
  bookmark: Bookmark;
  onDelete?: (id: string) => void;
  onEdit?: (bookmark: Bookmark) => void;
  editMode?: 'edit' | 'delete' | null;
}

export function BookmarkCard({ bookmark, onDelete, onEdit, editMode }: BookmarkCardProps) {
  const [hoverSide, setHoverSide] = useState<'left' | 'right' | null>(null);
  const [isInitialMount, setIsInitialMount] = useState(true);

  React.useEffect(() => {
    setIsInitialMount(false);
  }, []);

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const midpoint = rect.width / 2;
    const mouseX = e.clientX - rect.left;
    const side = mouseX < midpoint ? 'left' : 'right';
    setHoverSide(side);
  };

  const handleMouseLeave = () => {
    setHoverSide(null);
  };

  return (
    <motion.div
      initial={{ y: 0, rotate: 0, left: 0 ,x:0}}
      transition={{
        ease: "easeInOut",
        duration: 0.15,
      }}
      animate={!editMode && hoverSide && !isInitialMount ? {
        y: -8,
        rotate: hoverSide === 'left' ? -1 : 1,
      } : { y: 0, rotate: 0 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative bg-white border w-full h-9",
        "flex items-center justify border-3 border-gray-100 rounded-md overflow-visible  max-w-[250px] md:max-w-xs",
        "shadow-[0_1px_5px_rgb(0,0,0,0.2)]"
      )}
    >
      <a
        href={bookmark.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center w-full gap-4 px-2  ${editMode ? 'pointer-events-none' : ''}`}
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
          <h3 className="font-medium text-xs w- text-gray-900 group-hover:text-blue-600 transition-colors duration-300 truncate">
            <TextScramble
              speed={0.05}>
              {bookmark.title}
            </TextScramble>
          </h3>
        </div>
        <p className="text-xs sm:text-[10px] text-gray-400 truncate shrink-0">

          {getDomain(bookmark.url)}
        </p>
      </a>

      <AnimatePresence>
        {editMode === 'edit' && onEdit && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={() => onEdit(bookmark)}
            className="absolute left-full ml-1 flex items-center justify-center cursor-pointer text-black hover:bg-blue-50 rounded p-1 transition-colors"
          >
            <Edit3 className="size-5 sm:size-3.5" />
          </motion.button>
        )}
        {editMode === 'delete' && onDelete && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={() => onDelete(bookmark.id)}
            className="absolute left-full ml-1 flex items-center justify-center text-red-500 hover:bg-red-50 rounded p-1 transition-colors cursor-pointer"
          >
            <TrashIcon123 className="size-5 sm:size-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}