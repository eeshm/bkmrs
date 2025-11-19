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
  const [image, setImage] = useState<string | null>(null);
  const [favicon, setFavicon] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<'edit' | 'delete' | null>(null);

  const displayedBookmarks = searchQuery.trim() ? onSearchBookmarks(searchQuery) : bookmarks;

  const resetForm = () => {
    setUrl('');
    setTitle('');
    setTags('');
    setImage(null);
    setFavicon(null);
    setShowAddForm(false);
    setEditingBookmark(null);
  };

  const handleSubmit = async (e: React.FormEvent, metadata?: { title: string; image: string | null; favicon: string | null }) => {
    e.preventDefault();
    if (!url.trim()) return;

    const bookmarkData: Bookmark = {
      id: editingBookmark?.id || `bookmark_${Date.now()}`,
      title: title.trim() || metadata?.title || (await getPageTitle(url)) || new URL(url).hostname,
      url: url.trim(),
      tags: tags.trim() ? tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
      image: image || metadata?.image || null,
      favicon: favicon || metadata?.favicon || null,
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
    if (editMode === 'edit') {
      setEditingBookmark(bookmark);
      setUrl(bookmark.url);
      setTitle(bookmark.title);
      setTags(bookmark.tags?.join(', ') || '');
      setImage(bookmark.image || null);
      setFavicon(bookmark.favicon || null);
      setShowAddForm(true);
      setEditMode(null);
    }
  };

  const handleDelete = (id: string) => {
    if (editMode === 'delete') {
      onDeleteBookmark(id);
    }
  };

  const handleAddNew = () => {
    resetForm();
    setShowAddForm(true);
  };

  return (
    <div className="min-h-dvh h-dvh bg-[#ededed] flex flex-col overflow-hidden">
      {/* Header - White Background */}
      <div className="shrink-0">
        <DashboardHeader
          bookmarksCount={bookmarks.length}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddClick={handleAddNew}
          onImportClick={onImport}
          showSearch={true}
          showImport={true}
          editMode={editMode}
          onEditModeChange={setEditMode}
        />
      </div>

      {/* Add/Edit Form Modal */}
      <AddEditForm
        bookmark={editingBookmark}
        isOpen={showAddForm}
        url={url}
        title={title}
        tags={tags}
        image={image}
        favicon={favicon}
        onUrlChange={setUrl}
        onTitleChange={setTitle}
        onTagsChange={setTags}
        onImageChange={setImage}
        onFaviconChange={setFavicon}
        onSubmit={handleSubmit}
        onClose={resetForm}
      />

      {/* Main Content - Gray Rounded Section */}
      <main className="flex-1 overflow-hidden flex flex-col min-h-0 text-2xl">
        <div className="mx-auto max-w-[1500px] w-full h-full px-1 pb-1 flex flex-col min-h-0">
          <div className="bg-white rounded-xl flex-1 py-4 sm:py-4 px-1 sm:px-2 overflow-auto border border-gray-200 min-h-0">
            {/* Empty State or Bookmarks Grid */}
            {bookmarks.length === 0 ? (
              <EmptyState onAddClick={handleAddNew} />
            ) : (
              <BookmarksGrid
                bookmarks={displayedBookmarks}
                searchQuery={searchQuery}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onClearSearch={() => setSearchQuery('')}
                editMode={editMode}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
