import React from 'react';
import { ArrowLeft, Edit, Music, FileText, User, Disc, Calendar, Tag } from 'lucide-react';
import { LyricsPoem } from '../../types';
import { AnnotationEditor } from '../Editor/AnnotationEditor';

interface ItemViewerProps {
  item: LyricsPoem;
  onBack: () => void;
  onEdit: () => void;
}

export function ItemViewer({ item, onBack, onEdit }: ItemViewerProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-2">
              {item.type === 'lyrics' ? (
                <Music className="h-5 w-5 text-blue-600" />
              ) : (
                <FileText className="h-5 w-5 text-purple-600" />
              )}
              <h1 className="text-xl font-semibold text-gray-900">{item.title}</h1>
            </div>
          </div>
          <button
            onClick={onEdit}
            className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
          <div className="lg:col-span-2">
            <AnnotationEditor
              content={item.content}
              annotations={item.annotations}
              onAnnotationsChange={() => {}}
              isReadOnly={true}
            />
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-md font-semibold text-gray-900 mb-4">Metadata</h3>
              <div className="space-y-3">
                {item.artist && (
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {item.type === 'lyrics' ? 'Artist' : 'Author'}:
                    </span>
                    <span className="text-sm font-medium text-gray-900">{item.artist}</span>
                  </div>
                )}
                {item.album && (
                  <div className="flex items-center space-x-2">
                    <Disc className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Album:</span>
                    <span className="text-sm font-medium text-gray-900">{item.album}</span>
                  </div>
                )}
                {item.collection && (
                  <div className="flex items-center space-x-2">
                    <Disc className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Collection:</span>
                    <span className="text-sm font-medium text-gray-900">{item.collection}</span>
                  </div>
                )}
                {item.year && (
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Year:</span>
                    <span className="text-sm font-medium text-gray-900">{item.year}</span>
                  </div>
                )}
              </div>
            </div>

            {item.tags.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-md font-semibold text-gray-900 mb-3 flex items-center">
                  <Tag className="h-4 w-4 mr-2" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-md font-semibold text-gray-900 mb-3">Statistics</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Word count:</span>
                  <span className="font-medium">{item.content.split(/\s+/).filter(word => word.length > 0).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Character count:</span>
                  <span className="font-medium">{item.content.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Annotations:</span>
                  <span className="font-medium">{item.annotations.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Added:</span>
                  <span className="font-medium">{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}