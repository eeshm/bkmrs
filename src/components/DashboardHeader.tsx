import React from 'react';
import { Plus, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import StashLogo from '@/icons/logo';

interface DashboardHeaderProps {
  bookmarksCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddClick: () => void;
  onImportClick?: () => void;
  showSearch?: boolean;
  showImport?: boolean;
}

export function DashboardHeader({
  bookmarksCount,
  searchQuery,
  onSearchChange,
  onAddClick,
  onImportClick,
  showSearch = true,
  showImport = false,
}: DashboardHeaderProps) {
  return (
    <header className="">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <StashLogo className="size-8" />
          </div>
          <div className="flex gap-2 items-center">
            {showImport && bookmarksCount === 0 && onImportClick && (
              <Button
                onClick={onImportClick}
                variant="outline"
                className="rounded-full px-4"
              >
                Import
              </Button>
            )}
            <button
              onClick={onAddClick}
              className="border p-2 border-black/50 dark:border-white/50 rounded-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Plus className="size-4" />
            </button>
          </div>
        </div>

        {/* Search */}
        {showSearch && bookmarksCount > 0 && (
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search bookmarks..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-10 bg-gray-100 dark:bg-gray-800 border-0 rounded-full focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
