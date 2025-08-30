import React from 'react';
import { Music, FileText, Calendar, User, Disc, MessageSquare } from 'lucide-react';
import { LyricsPoem } from '../../types';

interface ItemCardProps {
  item: LyricsPoem;
  onClick: () => void;
}

export function ItemCard({ item, onClick }: ItemCardProps) {
  const preview = item.content.substring(0, 150) + (item.content.length > 150 ? '...' : '');
  
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md hover:border-blue-300 transition-all duration-200 group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          {item.type === 'lyrics' ? (
            <Music className="h-5 w-5 text-blue-600" />
          ) : (
            <FileText className="h-5 w-5 text-purple-600" />
          )}
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {item.title}
          </h3>
        </div>
        {item.annotations.length > 0 && (
          <div className="flex items-center space-x-1 text-amber-600">
            <MessageSquare className="h-4 w-4" />
            <span className="text-sm font-medium">{item.annotations.length}</span>
          </div>
        )}
      </div>

      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
        {preview}
      </p>

      <div className="flex flex-wrap gap-2 mb-3">
        {item.tags.slice(0, 3).map(tag => (
          <span
            key={tag}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800"
          >
            #{tag}
          </span>
        ))}
        {item.tags.length > 3 && (
          <span className="text-xs text-gray-500">+{item.tags.length - 3} more</span>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          {item.artist && (
            <div className="flex items-center space-x-1">
              <User className="h-3 w-3" />
              <span>{item.artist}</span>
            </div>
          )}
          {item.album && (
            <div className="flex items-center space-x-1">
              <Disc className="h-3 w-3" />
              <span>{item.album}</span>
            </div>
          )}
          {item.year && (
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{item.year}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}