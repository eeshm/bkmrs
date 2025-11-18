
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
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <header className="shrink-0">
        <div className="mx-auto max-w-[1500px] px-2 py-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center ">
              <StashLogo className="size-12" />
            </div>
            <div className="flex flex-col items-end p-1">
              <Button
                variant="ghost"
                onClick={onBack}
                className="text-gray-600  hover:text-gray-900 rounded-full text-xs"
              >
                <ArrowLeft className="size-4" />
                Back
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 max-w-2xl mx-auto w-full">
        <div className="text-center mb-6 space-y-1">
          <h2 className="text-3xl sm:text-2xl font-bold text-gray-900 ">
            Import Your Bookmarks
          </h2>
          <p className="text-sm md:text-xs text-gray-600 ">
            Bring your existing bookmarks from any browser
          </p>
        </div>


        {/* Upload Area */}
        <div className="flex justify-center mb-6">
          <div
            onClick={!isImporting ? handleUploadClick : undefined}
            className={cn(
              "relative border border-gray-100 border-dashed rounded-lg p-12 text-center transition-all duration-300 w-72 h-72 flex items-center justify-center",
              "border-gray-300  hover:bg-gray-50  cursor-pointer"
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
              <div className="space-y-4">
                <Loader2 className="size-6 mx-auto text-gray-500 animate-spin" />
                <p className="text-base md:text-sm font-medium text-gray-700 ">
                  Importing...
                </p>
              </div>
            ) : importSuccess ? (
              <div className="space-y-4">
                <CheckCircle2 className="size-12 mx-auto text-green-600" />
                <p className="text-base sm:text-sm font-medium text-green-700 ">
                  Congrats! Redirecting...
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center  py-3 text-center">
                <span className='rounded-full bg-gray-200 p-2'>
                <BookmarkIcon className="size-4  mx-auto text-gray-400" />
                </span>
                <div>
                  <p className="text-sm md:text-xs mt-2 font-medium">
                    Drag & Drop or Click to upload 
                  </p>
                </div>
                <p className="text-gray-500 mt-2 text-xs sm:text-[10px]">
                  Supports HTML bookmark exports
                </p>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50  border border-red-200  rounded-xl">
              <p className="text-red-600  text-center text-base md:text-sm">
                {error}
              </p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="flex justify-center mb-4 border py-3 px-4 border-dashed rounded-lg w-auto">
          <div className="flex gap-2 flex-col ">
              <h3 className="font-medium text-gray-700 text-sm md:text-xs">
                How to export bookmarks:
              </h3>
              <ul className="text-xs md:text-[10px] text-gray-500 space-y-0.5">
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
            className="border-none cursor-pointer underline hover:text-black transition-colors duration-300  text-gray-600  text-sm md:text-xs"
          >
            Skip
          </Button>
        </div>
      </main>
    </div>
  );
}

