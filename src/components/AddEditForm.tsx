import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { type Bookmark } from '@/types/index';

interface AddEditFormProps {
  bookmark?: Bookmark | null;
  isOpen: boolean;
  url: string;
  title: string;
  tags: string;
  onUrlChange: (value: string) => void;
  onTitleChange: (value: string) => void;
  onTagsChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  formRef: React.RefObject<HTMLDivElement | null>;
}

export function AddEditForm({
  bookmark,
  isOpen,
  url,
  title,
  tags,
  onUrlChange,
  onTitleChange,
  onTagsChange,
  onSubmit,
  onClose,
  formRef,
}: AddEditFormProps) {
  if (!isOpen) return null;

  return (
    <div ref={formRef} className="mb-8">
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {bookmark ? 'Edit Bookmark' : 'Add New Bookmark'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              URL *
            </label>
            <Input
              type="url"
              value={url}
              onChange={(e) => onUrlChange(e.target.value)}
              placeholder="https://example.com"
              required
              className="rounded-xl border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title
            </label>
            <Input
              type="text"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="Auto-detected from webpage"
              className="rounded-xl border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags
            </label>
            <Input
              type="text"
              value={tags}
              onChange={(e) => onTagsChange(e.target.value)}
              placeholder="work, design, inspiration (comma separated)"
              className="rounded-xl border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
            />
          </div>
          
          <div className="flex gap-3">
            <Button
              type="submit"
              className="flex-1 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 rounded-xl"
            >
              {bookmark ? 'Update' : 'Save'} Bookmark
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-xl border-gray-300 dark:border-gray-700"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
