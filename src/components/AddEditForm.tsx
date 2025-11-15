import React, { useEffect, useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { type Bookmark } from '@/types/index';
import { motion, AnimatePresence } from 'motion/react';
import { extractPageMetadata } from '@/utils/extractMetadata';
import { BookmarkIcon } from '@/icons/logo';

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
            initial={{ opacity: 0, y: -50, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, x: -100, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-25 left-1/2 -translate-x-1/2 w-full max-w-lg z-50"
          >
            <div className=" bg-white rounded-md border border-white/20 shadow-2xl">



              <div className="flex items-center border-b justify-between p-3 relative">

                <div className='flex items-center gap-2'>
                  <span className='bg-gray-200 rounded-md p-2'>
                    <BookmarkIcon className="size-4" />
                  </span>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {bookmark ? 'Edit Bookmark' : 'Add New Link'}
                  </h3>
                  <p></p>
                </div>
                <button
                  onClick={onClose}
                  className=" data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-3 right-3 rounded-xs opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5"
                >
                  <X className="size-3" />
                </button>
              </div>

              <form onSubmit={onSubmit}>
                <div className='p-3 gap-4'>
                  <div className='gap-1.5 mb-2'>
                    <Item type="url" url={url} onChange={onUrlChange} placeholder="https://example.com" label="URL *" />
                  </div>
                  <div className="flex  w-full gap-1.5 mb-2">
                    <div className='w-1/2'>
                      <Item type="text" url={title} onChange={onTitleChange} placeholder="My Bookmark Title" label="Title" />
                    </div>
                    <div className='w-1/2'>
                      <Item type="text" url={tags} onChange={onTagsChange} placeholder="tag1, tag2" label="Tags (comma separated)" />
                    </div>
                  </div>
                </div>
                <div className='border-b ' />

                <div className="flex space-x-2 justify-end p-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="rounded-lg border-gray-300 w-[90px]"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-black text-xs text-white hover:bg-gray-800  w-[90px] rounded-lg"
                  >
                    {bookmark ? 'Update' : 'Save'}
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


export function Item({ url, onChange, placeholder, label, type }: { url: string; onChange: (value: string) => void, placeholder: string, label: string, type: string }) {
  return <div>
    <div>
      <label className="block text-[10px] font-medium  mb-1">
        {label}
      </label>
      <div className="flex gap-2">
        <Input
          type={type}
          value={url}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={type === 'url'}
          autoFocus
          className="flex-1 rounded-lg placeholder:text-gray-500 h-8 text-xs border-gray-200 focus:ring-2 focus:ring-gray-400"
        />
      </div>
    </div>
  </div>;
}