import React, { useState } from 'react';
import { type Bookmark } from '@/types/index';
import { DashboardHeader } from '@/components/DashboardHeader';
import { AddEditForm } from '@/components/AddEditForm';
import { EmptyState } from '@/components/EmptyState';
import { BookmarksGrid } from '@/components/BookmarksGrid';

interface DashboardProps {
  bookmarks: Bookmark[];
  onAddBookmark: (bookmark: Bookmark) => void;
  onUpdateBookmark: (bookmark: Bookmark) => void;
  onDeleteBookmark: (id: string) => void;
  onSearchBookmarks: (query: string) => Bookmark[];
  onImport?: () => void;
}

export function Dashboard({
  bookmarks,
  onAddBookmark,
  onUpdateBookmark,
  onDeleteBookmark,
  onSearchBookmarks,
  onImport,
}: DashboardProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');

  const displayedBookmarks = searchQuery.trim() ? onSearchBookmarks(searchQuery) : bookmarks;

  const resetForm = () => {
    setUrl('');
    setTitle('');
    setTags('');
    setShowAddForm(false);
    setEditingBookmark(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    const bookmarkData: Bookmark = {
      id: editingBookmark?.id || `bookmark_${Date.now()}`,
      title: title.trim() || (await getPageTitle(url)) || new URL(url).hostname,
      url: url.trim(),
      tags: tags.trim() ? tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
      createdAt: editingBookmark?.createdAt || new Date().toISOString(),
    };

    if (editingBookmark) {
      onUpdateBookmark(bookmarkData);
    } else {
      onAddBookmark(bookmarkData);
    }

    resetForm();
  };

  const getPageTitle = async (url: string): Promise<string | null> => {
    try {
      return new URL(url).hostname;
    } catch {
      return null;
    }
  };

  const handleEdit = (bookmark: Bookmark) => {
    setEditingBookmark(bookmark);
    setUrl(bookmark.url);
    setTitle(bookmark.title);
    setTags(bookmark.tags?.join(', ') || '');
    setShowAddForm(true);
  };

  const handleAddNew = () => {
    resetForm();
    setShowAddForm(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <DashboardHeader
        bookmarksCount={bookmarks.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddClick={handleAddNew}
        onImportClick={onImport}
        showSearch={true}
        showImport={true}
      />

      {/* Add/Edit Form Modal */}
      <AddEditForm
        bookmark={editingBookmark}
        isOpen={showAddForm}
        url={url}
        title={title}
        tags={tags}
        onUrlChange={setUrl}
        onTitleChange={setTitle}
        onTagsChange={setTags}
        onSubmit={handleSubmit}
        onClose={resetForm}
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Empty State or Bookmarks Grid */}
        {bookmarks.length === 0 ? (
          <EmptyState onAddClick={handleAddNew} />
        ) : (
          <BookmarksGrid
            bookmarks={displayedBookmarks}
            searchQuery={searchQuery}
            onEdit={handleEdit}
            onDelete={onDeleteBookmark}
            onClearSearch={() => setSearchQuery('')}
          />
        )}
      </main>
    </div>
  );
}
