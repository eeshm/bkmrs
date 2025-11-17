import React, { useState } from 'react';
import { Search, X, } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TrashIcon123, StashLogo, EditIcon, PlusIcon } from '@/icons/logo';
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
      <div className="mx-auto max-w-[1500px] px-2 pt-4 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex">
            <StashLogo className="size-12" />
          </div>

          <div className="flex items-center justify-center h-full">
            {/* Top row: All action buttons in one line */}
            <div className="flex flex-row items-center gap-2 h-6">
              {bookmarksCount > 0 && (
                <div className="flex items-center h-full">
                  <AnimatePresence>
                    {showSearch && showSearchBar && (
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative overflow-hidden h-full flex items-center"
                      >
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 size-3 text-gray-400 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Search..."
                          value={searchQuery}
                          onChange={(e) => onSearchChange(e.target.value)}
                          autoFocus
                          className={cn("pl-6 rounded-lg placeholder:text-gray-400 text-xs pr-2 bg-gray-100 dark:bg-gray-800 border-0 h-full w-56",
                            "focus-visible:outline-none focus-visible:ring-0 border border-gray-300 dark:border-gray-700"
                          )}
                        />
                        {searchQuery && (
                          <button
                            onClick={() => onSearchChange('')}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            <X className="size-3" />
                          </button>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    onClick={() => setShowSearchBar(!showSearchBar)}
                    className="cursor-pointer flex items-center justify-center p-1 h-full"
                  >
                    <Search className="size-4 stroke-gray-600" />
                  </button>
                </div>
              )}

              {showImport && bookmarksCount === 0 && onImportClick && (
                <Button
                  onClick={onImportClick}
                  className="rounded-lg px-4 cursor-pointer underline"
                >
                  Import
                </Button>
              )}

              {bookmarksCount > 0 && (
                <>
                  <button
                    onClick={() => onEditModeChange?.(editMode === 'edit' ? null : 'edit')}
                    disabled={editMode === 'delete'}
                    className={`p-1 cursor-pointer transition-all rounded-lg ${editMode === 'edit'
                      ? 'bg-blue-600'
                      : editMode === 'delete' ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-blue-400'
                      }`}
                  >
                    <EditIcon className="size-3.5 stroke-gray-600" />
                  </button>
                  <button
                    onClick={() => onEditModeChange?.(editMode === 'delete' ? null : 'delete')}
                    disabled={editMode === 'edit'}
                    className={`p-1 rounded-lg cursor-pointer transition-all ${editMode === 'delete'
                      ? 'bg-red-600'
                      : editMode === 'edit' ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-red-200'
                      }`}
                  >
                    <TrashIcon123
                      className="size-4"
                      fill={editMode === 'delete' ? 'white' : 'var(--color-red-600)'}
                      secondaryfill={editMode === 'delete' ? 'var(--color-gray-200)' : 'var(--color-red-700)'}
                    />
                  </button>
                </>
              )}

              <button
                onClick={onAddClick}
                className="cursor-pointer transition-colors p-1"
              >
                <PlusIcon className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
