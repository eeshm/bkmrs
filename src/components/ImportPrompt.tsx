
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Loader2, CheckCircle2, ArrowLeft, Info } from 'lucide-react';
import { parseBookmarksFile } from '@/utils/parseBookmarksFile';
import { type Bookmark } from '@/types';
import { BookmarkIcon, StashLogo } from '@/icons/logo';
import { cn } from '@/lib/utils';
import { AppLayout, Main } from './AppLayout';

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
    <AppLayout>
      <header className="shrink-0">
        <div className=" px-4 sm:px-4 h-14 sm:h-16">
          <div className="flex items-center pt-1 sm:pt-2 justify-between h-full">
            <div className="flex">
              <StashLogo className="size-16 sm:size-12" />
            </div>
            <button
              onClick={onBack}
              className="text-gray-700 dark:text-gray-700 rounded-full text-[10px] sm:text-xs flex items-center gap-1 hover:bg-gray-100 p-1 sm:p-2 transition-colors"
            >
              <ArrowLeft className="size-6 sm:size-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Gray Rounded Section */}
      <Main>
        <div className= "flex flex-col items-center justify-center w-full max-w-md mx-auto pt-20">
        <div className="text-center mb-6 space-y-0.5 sm:space-y-1 px-2">
          <h2 className="text-3xl sm:text-2xl font-bold text-gray-900 sm:text-[#edecec] ">
            Import Your Bookmarks
          </h2>
          <p className="text-[14px] sm:text-xs text-gray-600 sm:text-[#edecec]/60">
            Bring your existing bookmarks from any browser
          </p>
        </div>

        {/* Upload Area */}
        <div className="flex flex-col items-center mb-6">
          <div
            onClick={!isImporting ? handleUploadClick : undefined}
            className={cn(
              "relative border border-gray-100 border-dashed rounded-lg p-6 sm:p-12 text-center transition-all duration-300 w-56 h-56 sm:w-72 sm:h-72 flex items-center justify-center",
              "border-gray-300 hover:bg-gray-50 cursor-pointer",
              "sm:hover:bg-[#14120b]/50"
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
                <p className="text-[10px] sm:text-sm font-medium text-gray-700 sm:text-[#edecec]/60">
                  Importing...
                </p>
              </div>
            ) : importSuccess ? (
              <div className="space-y-2 sm:space-y-4">
                <CheckCircle2 className="size-8 sm:size-12 mx-auto text-green-600" />
                <p className="text-[10px] sm:text-sm font-medium text-green-700 ">
                  Congrats! Redirecting...
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center  sm:px-4 py-2 sm:py-3 text-center">
                <span className='rounded-full bg-gray-200 p-1.5 sm:p-2'>
                  <BookmarkIcon className="size-3 sm:size-4 mx-auto sm:stroke-[#edecec]" />
                </span>
                <div>
                  <p className="text-[12px] sm:text-[#edecec] sm:text-[11px] mt-1 sm:mt-2 font-medium">
                    Drag & Drop or Click to upload
                  </p>
                </div>
                <p className="sm:text-[#edecec]/60 text-[8px] sm:text-[9px]">
                  Supports HTML bookmark exports
                </p>
              </div>
            )}
          </div>

          {error && (
            <p className="text-red-600 dark:text-red-400 text-xs sm:text-[10px] mt-2">
              {error}
            </p>
          )}
        </div>

        {/* Instructions */}
        <div className="flex justify-center mb-2 sm:mb-6 ">
          <div className="flex gap-2 flex-col border-dashed rounded-lg border  py-2 sm:py-3 px-2 sm:px-4  ">
            <h3 className="font-medium text-gray-700  sm:text-[#edecec] text-[14px] sm:text-xs">
              How to export bookmarks:
            </h3>
            <ul className="text-[12px] sm:text-[10px] text-gray-500  sm:text-[#edecec]/60 space-y-0.5">
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
            className="border-none cursor-pointer underline hover:text-black transition-colors duration-300 text-gray-600 sm:hover:text-white sm:text-[#edecec]/60 text-[14px] sm:text-xs"
          >
            Skip
          </button>
        </div>
      </div>
      </Main>
    </AppLayout>
  );
}

