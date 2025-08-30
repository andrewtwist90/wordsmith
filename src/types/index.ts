export interface Annotation {
  id: string;
  textStart: number;
  textEnd: number;
  selectedText: string;
  note: string;
  createdAt: Date;
}

export interface LyricsPoem {
  id: string;
  title: string;
  content: string;
  type: 'lyrics' | 'poem';
  artist?: string;
  album?: string;
  collection?: string;
  year?: number;
  tags: string[];
  annotations: Annotation[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchFilters {
  query: string;
  type?: 'lyrics' | 'poem';
  tags: string[];
  artist?: string;
  year?: number;
}