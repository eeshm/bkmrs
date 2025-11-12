import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Settings, Bookmark } from 'lucide-react';
import { type Bookmark as BookmarkType } from '@/types/index';

interface DashboardEmptyStateProps {
  bookmarks: BookmarkType[];
  onAddBookmark: (bookmark: BookmarkType) => void;
  onImportLater: () => void;
}

export function DashboardEmptyState({ bookmarks, onAddBookmark, onImportLater }: DashboardEmptyStateProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    const newBookmark: BookmarkType = {
      id: `bookmark_${Date.now()}`,
      title: title.trim() || new URL(url).hostname,
      url: url.trim(),
      createdAt: new Date().toISOString(),
    };

    onAddBookmark(newBookmark);
    setUrl('');
    setTitle('');
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Bookmark className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Floatmark
            </h1>
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-16">
        {bookmarks.length === 0 ? (
          <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Empty State Illustration */}
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-linear-to-br from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950">
              <Bookmark className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                No bookmarks yet
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                Start building your collection by adding your first bookmark
              </p>
            </div>

            {!showAddForm ? (
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => setShowAddForm(true)}
                  size="lg"
                  className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Your First Bookmark
                </Button>
                <Button
                  onClick={onImportLater}
                  variant="outline"
                  size="lg"
                >
                  Import Later
                </Button>
              </div>
            ) : (
              <Card className="max-w-md mx-auto border-slate-200 dark:border-slate-800 shadow-xl">
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        URL
                      </label>
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com"
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Title (optional)
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="My Bookmark"
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1">
                        Add Bookmark
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowAddForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Your Bookmarks
              </h2>
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Bookmark
              </Button>
            </div>

            <div className="grid gap-3">
              {bookmarks.map((bookmark) => (
                <Card key={bookmark.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block space-y-1 group"
                    >
                      <h3 className="font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {bookmark.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                        {bookmark.url}
                      </p>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}