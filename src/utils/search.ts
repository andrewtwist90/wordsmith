import { LyricsPoem, SearchFilters } from '../types';

export function filterItems(items: LyricsPoem[], filters: SearchFilters): LyricsPoem[] {
  return items.filter(item => {
    // Text search
    if (filters.query) {
      const query = filters.query.toLowerCase();
      const searchableText = [
        item.title,
        item.content,
        item.artist,
        item.album,
        item.collection,
        ...item.tags
      ].filter(Boolean).join(' ').toLowerCase();
      
      if (!searchableText.includes(query)) {
        return false;
      }
    }

    // Type filter
    if (filters.type && item.type !== filters.type) {
      return false;
    }

    // Tags filter
    if (filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some(tag => item.tags.includes(tag));
      if (!hasMatchingTag) {
        return false;
      }
    }

    // Artist filter
    if (filters.artist && item.artist !== filters.artist) {
      return false;
    }

    // Year filter
    if (filters.year && item.year !== filters.year) {
      return false;
    }

    return true;
  });
}

export function sortItems(items: LyricsPoem[], sortBy: 'title' | 'date' | 'artist' = 'date'): LyricsPoem[] {
  return [...items].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'artist':
        return (a.artist || '').localeCompare(b.artist || '');
      case 'date':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });
}