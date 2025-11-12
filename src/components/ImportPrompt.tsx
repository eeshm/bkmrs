
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, FileText, Loader2, CheckCircle2, ArrowLeft } from 'lucide-react';
import { parseBookmarksFile } from '@/utils/parseBookmarksFile';
import { type Bookmark } from '@/types';

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
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <div className="w-full max-w-lg space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="border-slate-200 dark:border-slate-800 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Import Your Bookmarks</CardTitle>
            <CardDescription>
              Upload your browser's bookmark export file
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Upload Area */}
            <div
              onClick={!isImporting ? handleUploadClick : undefined}
              className={`
                relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300
                ${isImporting || importSuccess 
                  ? 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/20' 
                  : 'border-slate-300 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-slate-50 dark:hover:bg-slate-900/50 cursor-pointer'
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
                <div className="space-y-3">
                  <Loader2 className="w-12 h-12 mx-auto text-blue-600 animate-spin" />
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Importing bookmarks...
                  </p>
                </div>
              ) : importSuccess ? (
                <div className="space-y-3">
                  <CheckCircle2 className="w-12 h-12 mx-auto text-green-600" />
                  <p className="text-sm font-medium text-green-700 dark:text-green-400">
                    Import successful!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <Upload className="w-12 h-12 mx-auto text-slate-400" />
                  <div>
                    <p className="text-base font-medium text-slate-700 dark:text-slate-300">
                      Drop your bookmarks file here
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                      or click to browse
                    </p>
                  </div>
                  <p className="text-xs text-slate-400 dark:text-slate-600">
                    Supports HTML bookmark exports
                  </p>
                </div>
              )}
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Instructions */}
            <Alert className="border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/20">
              <FileText className="w-4 h-4 text-blue-600" />
              <AlertDescription className="text-sm text-slate-700 dark:text-slate-300">
                <strong>How to export from Chrome:</strong><br />
                Chrome Menu → Bookmarks → Bookmark Manager → ⋮ → Export Bookmarks
              </AlertDescription>
            </Alert>

            <Button
              variant="outline"
              onClick={onSkip}
              className="w-full"
              disabled={isImporting}
            >
              Skip for now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

