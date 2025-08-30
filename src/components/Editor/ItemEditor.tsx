import React, { useState, useEffect } from 'react';
import { Save, X, ArrowLeft } from 'lucide-react';
import { LyricsPoem } from '../../types';
import { AnnotationEditor } from './AnnotationEditor';

interface ItemEditorProps {
  item?: LyricsPoem;
  onSave: (item: Omit<LyricsPoem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export function ItemEditor({ item, onSave, onCancel }: ItemEditorProps) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'lyrics' as 'lyrics' | 'poem',
    artist: '',
    album: '',
    collection: '',
    year: '',
    tags: '',
  });
  const [annotations, setAnnotations] = useState(item?.annotations || []);

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title,
        content: item.content,
        type: item.type,
        artist: item.artist || '',
        album: item.album || '',
        collection: item.collection || '',
        year: item.year ? item.year.toString() : '',
        tags: item.tags.join(', '),
      });
      setAnnotations(item.annotations);
    }
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tags = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const itemData: Omit<LyricsPoem, 'id' | 'createdAt' | 'updatedAt'> = {
      title: formData.title,
      content: formData.content,
      type: formData.type,
      artist: formData.artist || undefined,
      album: formData.album || undefined,
      collection: formData.collection || undefined,
      year: formData.year ? parseInt(formData.year) : undefined,
      tags,
      annotations,
    };

    onSave(itemData);
  };

  const isValid = formData.title.trim() && formData.content.trim();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onCancel}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900">
              {item ? 'Edit Item' : 'Add New Item'}
            </h2>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isValid}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'lyrics' | 'poem' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="lyrics">Lyrics</option>
                <option value="poem">Poem</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {formData.type === 'lyrics' ? 'Artist' : 'Author'}
                </label>
                <input
                  type="text"
                  value={formData.artist}
                  onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder={`Enter ${formData.type === 'lyrics' ? 'artist' : 'author'}...`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year
                </label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="YYYY"
                  min="1000"
                  max="2100"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {formData.type === 'lyrics' ? 'Album' : 'Collection'}
              </label>
              <input
                type="text"
                value={formData.type === 'lyrics' ? formData.album : formData.collection}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  ...(formData.type === 'lyrics' ? { album: e.target.value } : { collection: e.target.value })
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={`Enter ${formData.type === 'lyrics' ? 'album' : 'collection'}...`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter tags separated by commas..."
              />
              <p className="text-xs text-gray-500 mt-1">Separate tags with commas (e.g., rock, ballad, love)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono text-sm"
                rows={12}
                placeholder={`Enter ${formData.type}...`}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview & Annotations</h3>
            <AnnotationEditor
              content={formData.content}
              annotations={annotations}
              onAnnotationsChange={setAnnotations}
            />
          </div>
        </div>
      </div>
    </div>
  );
}