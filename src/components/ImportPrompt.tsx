
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Loader2, CheckCircle2, ArrowLeft, Info } from 'lucide-react';
import { parseBookmarksFile } from '@/utils/parseBookmarksFile';
import { type Bookmark } from '@/types';
import {BookmarkIcon, StashLogo} from '@/icons/logo';
import { cn } from '@/lib/utils';

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
    <div className="h-screen flex flex-col overflow-hidden bg-[#ededed]">
      {/* Header - White Background */}
    <header className="">
      <div className="mx-auto max-w-[1500px] px-1 sm:px-2 h-14 sm:h-16">
        <div className="flex items-center pt-1 sm:pt-2 justify-between h-full">
          <div className="flex">
            <StashLogo className="size-10 sm:size-12" />
          </div>
            <button
              onClick={onBack}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-full text-[10px] sm:text-xs flex items-center gap-1 hover:bg-gray-100 p-1 sm:p-2 transition-colors"
            >
              <ArrowLeft className="size-3 sm:size-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Gray Rounded Section */}
      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="mx-auto max-w-[1500px] w-full h-full px-1 pb-1 flex flex-col">
          <div className="bg-white rounded-xl flex-1 flex flex-col justify-center items-center py-4 px-2 overflow-auto border border-gray-200">
            <div className="text-center mb-3 sm:mb-6 space-y-0.5 sm:space-y-1 px-2">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                Import Your Bookmarks
              </h2>
              <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
                Bring your existing bookmarks from any browser
              </p>
            </div>

            {/* Upload Area */}
            <div className="flex justify-center mb-3 sm:mb-6">
              <div
                onClick={!isImporting ? handleUploadClick : undefined}
                className={cn(
                  "relative border border-gray-100 border-dashed rounded-lg p-6 sm:p-12 text-center transition-all duration-300 w-56 h-56 sm:w-72 sm:h-72 flex items-center justify-center",
                  "border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
                )}
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
                  <div className="space-y-2 sm:space-y-4">
                    <Loader2 className="size-4 sm:size-6 mx-auto text-gray-500 animate-spin" />
                    <p className="text-[10px] sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                      Importing...
                    </p>
                  </div>
                ) : importSuccess ? (
                  <div className="space-y-2 sm:space-y-4">
                    <CheckCircle2 className="size-8 sm:size-12 mx-auto text-green-600" />
                    <p className="text-[10px] sm:text-sm font-medium text-green-700 dark:text-green-400">
                      Congrats! Redirecting...
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center px-2 sm:px-4 py-2 sm:py-3 text-center">
                    <span className='rounded-full bg-gray-200 p-1.5 sm:p-2'>
                      <BookmarkIcon className="size-3 sm:size-4 mx-auto text-gray-400" />
                    </span>
                    <div>
                      <p className="text-[9px] sm:text-[11px] mt-1 sm:mt-2 font-medium">
                        Drag & Drop or Click to upload
                      </p>
                    </div>
                    <p className="text-gray-500 text-[8px] sm:text-[9px]">
                      Supports HTML bookmark exports
                    </p>
                  </div>
                )}
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                  <p className="text-red-600 dark:text-red-400 text-center text-sm">
                    {error}
                  </p>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="flex justify-center mb-2 sm:mb-4 border py-2 sm:py-3 px-2 sm:px-4 border-dashed rounded-lg w-auto mx-2">
              <div className="flex gap-2 flex-col">
                <h3 className="font-medium text-gray-700 text-[10px] sm:text-xs">
                  How to export bookmarks:
                </h3>
                <ul className="text-[8px] sm:text-[10px] text-gray-500 space-y-0.5">
                  <li><strong>Chrome/Edge:</strong> Menu → Bookmarks → Bookmark Manager → ⋯ → Export</li>
                  <li><strong>Firefox:</strong> Menu → Bookmarks → Manage Bookmarks → Import & Backup → Export</li>
                  <li><strong>Safari:</strong> File → Export Bookmarks</li>
                </ul>
              </div>
            </div>

            {/* Skip Button */}
            <div className="text-center">
              <button
                onClick={onSkip}
                disabled={isImporting}
                className="border-none cursor-pointer underline hover:text-black transition-colors duration-300 dark:hover:text-white text-gray-600 dark:text-gray-400 text-[10px] sm:text-xs"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

