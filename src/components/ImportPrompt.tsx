
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Loader2, CheckCircle2, ArrowLeft, Info } from 'lucide-react';
import { parseBookmarksFile } from '@/utils/parseBookmarksFile';
import { type Bookmark } from '@/types';
import {StashLogo} from '@/icons/logo';

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
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <StashLogo className="w-8 h-8" />
            </div>
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-full text-xs"
            >
              <ArrowLeft className="size-3" />
              Back
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
            Import Your Bookmarks
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Bring your existing bookmarks from any browser
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 mb-8">
          <div
            onClick={!isImporting ? handleUploadClick : undefined}
            className={`
              relative border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-300
              ${isImporting || importSuccess 
                ? 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/20' 
                : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer'
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
                <Loader2 className="w-16 h-16 mx-auto text-blue-600 animate-spin" />
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Importing your bookmarks...
                </p>
              </div>
            ) : importSuccess ? (
              <div className="space-y-4">
                <CheckCircle2 className="w-16 h-16 mx-auto text-green-600" />
                <p className="text-lg font-medium text-green-700 dark:text-green-400">
                  Import successful! Redirecting...
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-16 h-16 mx-auto text-gray-400" />
                <div>
                  <p className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                    Drop your bookmarks file here
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    or click to browse files
                  </p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Supports HTML bookmark exports from any browser
                </p>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
              <p className="text-red-800 dark:text-red-400 text-center font-medium">
                {error}
              </p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 mb-8">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
                How to export bookmarks:
              </h3>
              <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
                <li><strong>Chrome/Edge:</strong> Menu → Bookmarks → Bookmark Manager → ⋯ → Export</li>
                <li><strong>Firefox:</strong> Menu → Bookmarks → Manage Bookmarks → Import & Backup → Export</li>
                <li><strong>Safari:</strong> File → Export Bookmarks</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Skip Button */}
        <div className="text-center">
          <Button
            variant="outline"
            onClick={onSkip}
            disabled={isImporting}
            className="px-8 rounded-full border-gray-300 dark:border-gray-700"
          >
            Skip for now
          </Button>
        </div>
      </main>
    </div>
  );
}

