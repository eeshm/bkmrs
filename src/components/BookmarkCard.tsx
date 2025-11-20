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
        y: -4,
        rotate: hoverSide === 'left' ? -0.5 : 0.5,
      } : { y: 0, rotate: 0 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative w-full h-10",
        "flex items-center justify-between rounded-lg overflow-visible max-w-[250px] md:max-w-xs transition-colors duration-200",
        "bg-white border border-gray-200 hover:border-gray-300",
        "sm:bg-[#edecec]/10 sm:border-[#edecec]/10 sm:hover:border-[#edecec]/20",
      )}
    >
      <a
        href={bookmark.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center w-full gap-3 px-3 ${editMode ? 'pointer-events-none opacity-50' : ''}`}
      >
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          {bookmark.favicon ? (
            <img
              src={bookmark.favicon}
              alt=""
              className="size-4 rounded-sm shrink-0"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className="size-4 rounded-sm shrink-0 bg-gray-100 sm:bg-[#edecec]/10" />
          )}
          <h3 className="font-medium text-sm text-gray-900 sm:text-[#edecec] truncate leading-none pt-0.5">
            <TextScramble
              speed={0.05}
              className="group-hover:text-black sm:group-hover:text-white transition-colors"
            >
              {bookmark.title}
            </TextScramble>
          </h3>
        </div>
        <p className="text-[10px] text-gray-400 sm:text-[#edecec]/40 truncate shrink-0 font-mono transition-opacity duration-300">
          {getDomain(bookmark.url)}
        </p>
      </a>

      <AnimatePresence>
        {editMode === 'edit' && onEdit && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, x: -10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -10 }}
            transition={{ duration: 0.2 }}
            onClick={() => onEdit(bookmark)}
            className="absolute -right-8 flex items-center justify-center cursor-pointer rounded-md hover:text-white hover:bg-blue-600 sm:text-[#edecec]/40 sm:hover:text-blue-400 p-1.5 transition-colors"
          >
            <Edit3 className="size-4" />
          </motion.button>
        )}
        {editMode === 'delete' && onDelete && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, x: -10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -10 }}
            transition={{ duration: 0.2 }}
            onClick={() => onDelete(bookmark.id)}
            className="absolute -right-8 flex items-center justify-center cursor-pointer rounded-md hover:text-white text-red-600 hover:bg-red-600 sm:text-[#edecec]/40 sm:hover:text-red-400 p-1.5 transition-colors"
          >
            <TrashIcon123 className="size-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}