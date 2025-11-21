import React, { useState } from 'react';
import { Search, X, } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TrashIcon123, StashLogo, EditIcon, PlusIcon } from '@/icons/logo';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from "motion/react";
import { Input } from './ui/input';
import { KeyboardShortcuts } from './KeyboardShortcuts';

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
  isSearchOpen: boolean;
  onSearchOpenChange: (isOpen: boolean) => void;
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
  isSearchOpen,
  onSearchOpenChange,
}: DashboardHeaderProps) {
  return (
    <header>
      <div className="mx-auto px-4 py-1 sm:border-0 border-b border-gray-200 border-dashed sm:h-full h-14 ">
        <div className="flex items-center pt-1  justify-between h-full">
          <div className="flex">
            <StashLogo className=" size-10 sm:size-12" />
          </div>
 
          <div className="flex items-center justify-center h-full">
            {/* Top row: All action buttons in one line */}
            <div className="flex flex-row items-center gap-2  h-9 rounded-md">
              {bookmarksCount > 0 && (
                <div className="flex items-center h-full">
                  <AnimatePresence>
                    {showSearch && isSearchOpen && (
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative  flex items-center overflow-hidden rounded-md sm:shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
                      >
                        <Input
                          type="text"
                          placeholder="Search..."
                          value={searchQuery}
                          onChange={(e) => onSearchChange(e.target.value)}
                          autoFocus
                          className="flex-1 rounded-lg h-7  sm:h-full sm:w-full w-28 border placeholder:text-gray-500 text-base border-gray-200 focus:ring-0 focus:ring-gray-400"
                        />
                        {searchQuery && (
                          <button
                            onClick={() => onSearchChange('')}
                            className="absolute right-0.5 sm:right-1 top-1/2 hover:bg-gray-200 p-1 sm:p-2 rounded-md transition-colors duration-200 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            <X className="size-3 " />
                          </button>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    onClick={() => onSearchOpenChange(!isSearchOpen)}
                    className="cursor-pointer flex items-center justify-center p-1"
                  >
                    <Search className="size-3 sm:size-4 stroke-gray-600" />
                  </button>
                </div>
              )}

              {showImport && bookmarksCount === 0 && onImportClick && (
                <Button
                  onClick={onImportClick}
                  size="sm"
                  variant="ghost"
                  className="px-2  rounded-lg text-sm font-medium text-gray-900  hover:bg-transparent hover:opacity-70 transition-all duration-300 underline underline-offset-4 cursor-pointer"
                >
                  Import
                </Button>
              )}
              {bookmarksCount > 0 && (
                <>
                  <button
                    onClick={() => onEditModeChange?.(editMode === 'edit' ? null : 'edit')}
                    disabled={editMode === 'delete'}
                    className={`p-1 flex items-center justify-center cursor-pointer transition-all rounded-lg ${editMode === 'edit'
                      ? 'bg-blue-600 stroke-white fill-white'
                      : editMode === 'delete' ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-blue-400'
                        }`}
                      title="Edit Mode (E)"
                  >
                    <EditIcon className="size-3 sm:size-4" />
                  </button>
                  <button
                    onClick={() => onEditModeChange?.(editMode === 'delete' ? null : 'delete')}
                    disabled={editMode === 'edit'}
                    className={`p-1  flex items-center justify-center cursor-pointer transition-all rounded-lg ${editMode === 'delete'
                      ? 'bg-red-600'
                      : editMode === 'edit' ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-red-200'
                      }`}
                    title="Delete Mode (D)"
                  >
                    <TrashIcon123
                      className="size-3 sm:size-4"
                      fill={editMode === 'delete' ? 'white' : 'var(--color-red-600)'}
                      secondaryfill={editMode === 'delete' ? 'var(--color-gray-200)' : 'var(--color-red-700)'}
                    />
                  </button>
                </>
              )}

              <button
                onClick={onAddClick}
                className="cursor-pointer flex items-center justify-center transition-colors p-1"
                title="Add New (A)"
              >
                <PlusIcon className="size-3 sm:size-4" />
              </button>

              <div className="hidden sm:block">
                <KeyboardShortcuts />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}