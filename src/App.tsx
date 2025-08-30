import React, { useState, useMemo } from 'react';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { ItemList } from './components/ItemList/ItemList';
import { ItemEditor } from './components/Editor/ItemEditor';
import { ItemViewer } from './components/Viewer/ItemViewer';
import { useLocalStorage } from './hooks/useLocalStorage';
import { filterItems, sortItems } from './utils/search';
import { sampleData } from './utils/sampleData';
import { LyricsPoem } from './types';

type ViewMode = 'list' | 'editor' | 'viewer';

function App() {
  const [items, setItems] = useLocalStorage<LyricsPoem[]>('lyrics-poems', sampleData);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedItem, setSelectedItem] = useState<LyricsPoem | null>(null);
  const [editingItem, setEditingItem] = useState<LyricsPoem | null>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<'lyrics' | 'poem' | undefined>();

  const filteredItems = useMemo(() => {
    const filters = {
      query: searchQuery,
      type: selectedType,
      tags: selectedTags,
    };
    return sortItems(filterItems(items, filters));
  }, [items, searchQuery, selectedTags, selectedType]);

  const handleNewItem = () => {
    setEditingItem(null);
    setViewMode('editor');
  };

  const handleEditItem = (item: LyricsPoem) => {
    setEditingItem(item);
    setViewMode('editor');
  };

  const handleSaveItem = (itemData: Omit<LyricsPoem, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingItem) {
      // Update existing item
      const updatedItem: LyricsPoem = {
        ...editingItem,
        ...itemData,
        updatedAt: new Date(),
      };
      setItems(items.map(item => item.id === editingItem.id ? updatedItem : item));
    } else {
      // Create new item
      const newItem: LyricsPoem = {
        ...itemData,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setItems([newItem, ...items]);
    }
    setViewMode('list');
    setEditingItem(null);
  };

  const handleViewItem = (item: LyricsPoem) => {
    setSelectedItem(item);
    setViewMode('viewer');
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedItem(null);
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        onNewItem={handleNewItem}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="flex">
        {viewMode === 'list' && (
          <Sidebar
            items={items}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            selectedType={selectedType}
            onTypeChange={setSelectedType}
          />
        )}

        <main className="flex-1 p-6">
          {viewMode === 'list' && (
            <ItemList
              items={filteredItems}
              onItemSelect={handleViewItem}
            />
          )}

          {viewMode === 'editor' && (
            <ItemEditor
              item={editingItem || undefined}
              onSave={handleSaveItem}
              onCancel={handleBackToList}
            />
          )}

          {viewMode === 'viewer' && selectedItem && (
            <ItemViewer
              item={selectedItem}
              onBack={handleBackToList}
              onEdit={() => handleEditItem(selectedItem)}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;