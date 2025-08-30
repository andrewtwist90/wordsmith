import React from 'react';
import { ItemCard } from './ItemCard';
import { LyricsPoem } from '../../types';

interface ItemListProps {
  items: LyricsPoem[];
  onItemSelect: (item: LyricsPoem) => void;
}

export function ItemList({ items, onItemSelect }: ItemListProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl">📝</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
        <p className="text-gray-500 mb-6">Start building your collection by adding your first lyrics or poem.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(item => (
        <ItemCard
          key={item.id}
          item={item}
          onClick={() => onItemSelect(item)}
        />
      ))}
    </div>
  );
}