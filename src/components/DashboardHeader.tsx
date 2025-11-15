import React, { useState } from 'react';
import { Plus, Search, X, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TrashIcon123, StashLogo } from '@/icons/logo';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from "motion/react";

interface DashboardHeaderProps {
  bookmarksCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddClick: () => void;
  onImportClick?: () => void;
  showSearch?: boolean;
  showImport?: boolean;
  editMode?: 'edit' | 'delete' | null;
  onEditModeChange?: (mode: 'edit' | 'delete' | null) => void;
}

export function DashboardHeader({
  bookmarksCount,
  searchQuery,
  onSearchChange,
  onAddClick,
  onImportClick,
  showSearch = true,
  showImport = false,
  editMode,
  onEditModeChange,
}: DashboardHeaderProps) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  return (
    <header className="">
      <div className="mx-auto max-w-[1480px] px-2 py-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center ">
            <StashLogo className="size-12" />
          </div>
          <div className="flex flex-col gap-2 items-end">
            {/* Top row: Add button */}
            <div className="flex gap-2 items-center">
              {showImport && bookmarksCount === 0 && onImportClick && (
                <Button
                  onClick={onImportClick}
                  className="rounded-lg px-4"
                >
                  Import
                </Button>
              )}
              <button
                onClick={onAddClick}
                className="cursor-pointer transition-colors relative right-1"
              >
                <Plus className="size-4 stroke-gray-600" />
              </button>
            </div>

            {/* Bottom row: Edit, Delete, Search buttons */}
            {bookmarksCount > 0 && (
              <div className="flex flex-col gap-2 items-center">
                <button
                  onClick={() => onEditModeChange?.(editMode === 'edit' ? null : 'edit')}
                  disabled={editMode === 'delete'}
                  className={`cursor-pointer transition-all ${editMode === 'edit'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : editMode === 'delete' ? 'opacity-50 cursor-not-allowed'
                      : 'border-black/50 dark:border-white/50 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                >
                  <Edit3 className="size-4 stroke-gray-600" />
                </button>
                <button
                  onClick={() => onEditModeChange?.(editMode === 'delete' ? null : 'delete')}
                  disabled={editMode === 'edit'}
                  className={` p-1 rounded-lg cursor-pointer transition-all group ${editMode === 'delete'
                    ? 'bg-red-600 border-red-600'
                    : editMode === 'edit' ? 'opacity-50 cursor-not-allowed'
                      : 'dark:border-white/50 hover:bg-red-200'
                    }`}
                >
                  <TrashIcon123
                    className="size-4"
                    fill={editMode === 'delete' ? 'white' : 'var(--color-red-600)'}
                    secondaryfill={editMode === 'delete' ? 'var(--color-gray-200)' : 'var(--color-red-700)'}
                  />
                </button>

                <button
                  onClick={() => setShowSearchBar(!showSearchBar)}
                  className="cursor-pointer "
                >
                  <Search className="size-4 stroke-gray-600" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar - Slide in animation */}
        {showSearch && bookmarksCount > 0 && showSearchBar && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 relative overflow-hidden"
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search bookmarks..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                autoFocus
                className="pl-10 pr-10 bg-gray-100 dark:bg-gray-800 border-0 rounded-full focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 h-9"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="size-4" />
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </header>
  );
}
