import React from 'react';
import { Music, FileText, Tag, Calendar } from 'lucide-react';
import { LyricsPoem } from '../../types';

interface SidebarProps {
  items: LyricsPoem[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  selectedType?: 'lyrics' | 'poem';
  onTypeChange: (type?: 'lyrics' | 'poem') => void;
}

export function Sidebar({ items, selectedTags, onTagToggle, selectedType, onTypeChange }: SidebarProps) {
  const allTags = Array.from(new Set(items.flatMap(item => item.tags))).sort();
  const stats = {
    total: items.length,
    lyrics: items.filter(item => item.type === 'lyrics').length,
    poems: items.filter(item => item.type === 'poem').length,
  };

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Collection Stats</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Total Items</span>
              <span className="font-medium">{stats.total}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Lyrics</span>
              <span className="font-medium">{stats.lyrics}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Poems</span>
              <span className="font-medium">{stats.poems}</span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-md font-semibold text-gray-900 mb-3">Filter by Type</h3>
          <div className="space-y-2">
            <button
              onClick={() => onTypeChange(undefined)}
              className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                !selectedType 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FileText className="h-4 w-4 mr-2" />
              All Items
            </button>
            <button
              onClick={() => onTypeChange('lyrics')}
              className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedType === 'lyrics' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Music className="h-4 w-4 mr-2" />
              Lyrics
            </button>
            <button
              onClick={() => onTypeChange('poem')}
              className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedType === 'poem' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Poems
            </button>
          </div>
        </div>

        {allTags.length > 0 && (
          <div>
            <h3 className="text-md font-semibold text-gray-900 mb-3 flex items-center">
              <Tag className="h-4 w-4 mr-2" />
              Tags
            </h3>
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => onTagToggle(tag)}
                  className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-amber-100 text-amber-800'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}