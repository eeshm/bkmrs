
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Loader2, CheckCircle2, ArrowLeft, Info } from 'lucide-react';
import { parseBookmarksFile } from '@/utils/parseBookmarksFile';
import { type Bookmark } from '@/types';
import {BookmarkIcon, StashLogo} from '@/icons/logo';

interface ImportPromptProps {
  onImportComplete: (bookmarks: Bookmark[]) => void;
  onBack: () => void;
  onSkip: () => void;
}

export function ImportPrompt({ onImportComplete, onBack, onSkip }: ImportPromptProps) {
  const [isImporting, setIsImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setError(null);

    try {
      const bookmarks = await parseBookmarksFile(file);
      
      if (bookmarks.length === 0) {
        setError('No bookmarks found in the file. Please check the format.');
        setIsImporting(false);
        return;
      }

      setImportSuccess(true);
      
      setTimeout(() => {
        onImportComplete(bookmarks);
      }, 1000);
    } catch (err) {
      setError('Failed to parse bookmarks file. Please ensure it\'s a valid HTML export.');
      setIsImporting(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="">
        <div className="mx-auto max-w-[1480px] px-2 py-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center ">
              <StashLogo className="size-12" />
            </div>
            <div className="flex flex-col items-end p-1">
              <Button
                variant="ghost"
                onClick={onBack}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-full text-xs"
              >
                <ArrowLeft className="size-4" />
                Back
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-12 space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white ">
            Import Your Bookmarks
          </h2>
          <p className="sm:text-sm text-xs text-gray-600 dark:text-gray-400">
            Bring your existing bookmarks from any browser
          </p>
        </div>


        {/* Upload Area */}
        <div className=" flex justify-center mb-8">
          <div
            onClick={!isImporting ? handleUploadClick : undefined}
            className={`
              relative border border-gray-100 border-dashed rounded-lg p-16 text-center transition-all duration-300 w-80 h-80 flex items-center justify-center
              ${isImporting || importSuccess 
                ? 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/20' 
                : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer'
              }
            `}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".html,.htm"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isImporting}
            />

            {isImporting ? (
              <div className="space-y-4">
                <Loader2 className="size-12 mx-auto text-blue-600 animate-spin" />
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Importing your bookmarks...
                </p>
              </div>
            ) : importSuccess ? (
              <div className="space-y-4">
                <CheckCircle2 className="w-16 h-16 mx-auto text-green-600" />
                <p className="text-lg font-medium text-green-700 dark:text-green-400">
                  Congrats! Redirecting...
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
                <span className='rounded-full bg-gray-200 p-2'>
                <BookmarkIcon className="size-4  mx-auto text-gray-400" />
                </span>
                <div>
                  <p className="text-[12px] mt-2 font-medium sm:mb-1.5 sm:text-xs">
                    Drag & Drop or Click to upload 
                  </p>
                </div>
                <p className="text-gray-500  text-[10px]">
                  Supports HTML bookmark exports from any browser
                </p>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
              <p className="text-red-600 dark:text-red-400 text-center font-medium">
                {error}
              </p>
            </div>
          )}
        </div>

        {/* Instructions */}
                {/* Instructions */}
        <div className=" flex justify-center mb-8 border py-5 border-dashed rounded-lg ">
          <div className="flex gap-3 flex-col ">
              <h3 className="font-medium text-gray-700 mb-2">
                How to export bookmarks:
              </h3>
              <ul className="text-sm text-gray-500 space-y-1 ">
                <li><strong>Chrome/Edge:</strong> Menu → Bookmarks → Bookmark Manager → ⋯ → Export</li>
                <li><strong>Firefox:</strong> Menu → Bookmarks → Manage Bookmarks → Import & Backup → Export</li>
                <li><strong>Safari:</strong> File → Export Bookmarks</li>
              </ul>
          </div>
        </div>


        {/* Skip Button */}
        <div className="text-center">
          <Button
            variant="outline"
            onClick={onSkip}
            disabled={isImporting}
            className=" border-none cursor-pointer  underline hover:text-black  transition-colors duration-300 dark:hover:text-white text-gray-600 dark:text-gray-400"
          >
            Skip
          </Button>
        </div>
      </main>
    </div>
  );
}

