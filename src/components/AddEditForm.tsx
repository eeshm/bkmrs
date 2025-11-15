import React, { useEffect, useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { type Bookmark } from '@/types/index';
import { motion, AnimatePresence } from 'motion/react';
import { extractPageMetadata } from '@/utils/extractMetadata';

interface AddEditFormProps {
  bookmark?: Bookmark | null;
  isOpen: boolean;
  url: string;
  title: string;
  tags: string;
  image: string | null;
  favicon: string | null;
  onUrlChange: (value: string) => void;
  onTitleChange: (value: string) => void;
  onTagsChange: (value: string) => void;
  onImageChange: (value: string | null) => void;
  onFaviconChange: (value: string | null) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export function AddEditForm({
  bookmark,
  isOpen,
  url,
  title,
  tags,
  image,
  favicon,
  onUrlChange,
  onTitleChange,
  onTagsChange,
  onImageChange,
  onFaviconChange,
  onSubmit,
  onClose,
}: AddEditFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Extract metadata when URL changes
  useEffect(() => {
    if (!isOpen || !url.trim() || url === bookmark?.url) return;

    const extractMetadata = async () => {
      setIsLoading(true);
      try {
        const metadata = await extractPageMetadata(url);
        if (!title) onTitleChange(metadata.title);
        if (!image) onImageChange(metadata.image);
        onFaviconChange(metadata.favicon);
      } catch (error) {
        console.error('Failed to extract metadata:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(extractMetadata, 800);
    return () => clearTimeout(debounce);
  }, [url, isOpen, title, image, onTitleChange, onImageChange, onFaviconChange, bookmark?.url]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -50, x:100,scale: 0.95 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, x:-100, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-50 left-1/2 -translate-x-1/2 w-full max-w-lg z-50 px-4"
          >
            <div className=" bg-white rounded-2xl border border-white/20 shadow-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {bookmark ? 'Edit Bookmark' : 'Add New Bookmark'}
                </h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL *
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="url"
                      value={url}
                      onChange={(e) => onUrlChange(e.target.value)}
                      placeholder="https://example.com"
                      required
                      autoFocus
                      className="flex-1 rounded-xl border-gray-200 focus:ring-2 focus:ring-gray-400"
                    />
                    {isLoading && (
                      <div className="flex items-center px-3">
                        <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-1 w-full">
                  <div className="w-1/2">
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <Input
                      type="text"
                      value={title}
                      onChange={(e) => onTitleChange(e.target.value)}
                      placeholder="Auto-detected from webpage"
                      className="rounded-lg text-xs border-gray-200 focus:ring-2 h-8 focus:ring-gray-400"
                    />
                  </div>
                  
                  <div className="w-1/2">
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <Input
                      type="text"
                      value={tags}
                      onChange={(e) => onTagsChange(e.target.value)}
                      placeholder="work, design, inspiration"
                      className="rounded-lg text-xs border-gray-200 focus:ring-2 h-8 focus:ring-gray-400"
                    />
                  </div>
                </div>
                
                <div className="flex gap-3 pt-2">
                  <Button
                    type="submit"
                    className="flex-1 bg-black text-white hover:bg-gray-800 rounded-xl"
                  >
                    {bookmark ? 'Update' : 'Save'} Bookmark
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="rounded-xl border-gray-300"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
