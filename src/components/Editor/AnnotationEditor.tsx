import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Save } from 'lucide-react';
import { Annotation } from '../../types';

interface AnnotationEditorProps {
  content: string;
  annotations: Annotation[];
  onAnnotationsChange: (annotations: Annotation[]) => void;
  isReadOnly?: boolean;
}

export function AnnotationEditor({ content, annotations, onAnnotationsChange, isReadOnly = false }: AnnotationEditorProps) {
  const [selectedRange, setSelectedRange] = useState<{ start: number; end: number; text: string } | null>(null);
  const [editingAnnotation, setEditingAnnotation] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const textRef = useRef<HTMLDivElement>(null);

  const handleTextSelection = () => {
    if (isReadOnly) return;
    
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      const range = selection.getRangeAt(0);
      const selectedText = selection.toString();
      const textNode = textRef.current;
      
      if (textNode && textNode.contains(range.startContainer)) {
        const start = getTextOffset(textNode, range.startContainer, range.startOffset);
        const end = start + selectedText.length;
        
        setSelectedRange({ start, end, text: selectedText });
        setNoteText('');
      }
    }
  };

  const getTextOffset = (root: Node, node: Node, offset: number): number => {
    let textOffset = 0;
    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT,
      null
    );
    
    let currentNode;
    while (currentNode = walker.nextNode()) {
      if (currentNode === node) {
        return textOffset + offset;
      }
      textOffset += currentNode.textContent?.length || 0;
    }
    return textOffset;
  };

  const addAnnotation = () => {
    if (!selectedRange || !noteText.trim()) return;

    const newAnnotation: Annotation = {
      id: crypto.randomUUID(),
      textStart: selectedRange.start,
      textEnd: selectedRange.end,
      selectedText: selectedRange.text,
      note: noteText.trim(),
      createdAt: new Date(),
    };

    onAnnotationsChange([...annotations, newAnnotation]);
    setSelectedRange(null);
    setNoteText('');
    window.getSelection()?.removeAllRanges();
  };

  const updateAnnotation = (annotationId: string, newNote: string) => {
    const updatedAnnotations = annotations.map(ann =>
      ann.id === annotationId ? { ...ann, note: newNote } : ann
    );
    onAnnotationsChange(updatedAnnotations);
    setEditingAnnotation(null);
  };

  const deleteAnnotation = (annotationId: string) => {
    onAnnotationsChange(annotations.filter(ann => ann.id !== annotationId));
  };

  const renderAnnotatedText = () => {
    if (!content) return null;

    const sortedAnnotations = [...annotations].sort((a, b) => a.textStart - b.textStart);
    let lastIndex = 0;
    const elements: React.ReactNode[] = [];

    sortedAnnotations.forEach((annotation, index) => {
      // Add text before annotation
      if (lastIndex < annotation.textStart) {
        elements.push(
          <span key={`text-${index}`}>
            {content.substring(lastIndex, annotation.textStart)}
          </span>
        );
      }

      // Add annotated text
      elements.push(
        <span
          key={annotation.id}
          className="bg-yellow-200 border-b-2 border-yellow-400 cursor-pointer hover:bg-yellow-300 transition-colors relative group"
          title={annotation.note}
        >
          {annotation.selectedText}
          <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-10">
            <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 max-w-64 shadow-lg">
              {annotation.note}
            </div>
          </div>
        </span>
      );

      lastIndex = annotation.textEnd;
    });

    // Add remaining text
    if (lastIndex < content.length) {
      elements.push(
        <span key="text-end">
          {content.substring(lastIndex)}
        </span>
      );
    }

    return elements;
  };

  return (
    <div className="space-y-6">
      <div
        ref={textRef}
        className="bg-white rounded-lg border border-gray-200 p-6 min-h-96 cursor-text leading-relaxed whitespace-pre-wrap font-mono text-sm"
        onMouseUp={handleTextSelection}
        style={{ userSelect: isReadOnly ? 'none' : 'text' }}
      >
        {annotations.length > 0 ? renderAnnotatedText() : content}
      </div>

      {selectedRange && !isReadOnly && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <MessageSquare className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-gray-700 mb-2">
                Selected: "<span className="font-medium">{selectedRange.text}</span>"
              </p>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Add your annotation..."
                className="w-full p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                rows={3}
              />
              <div className="flex justify-end space-x-2 mt-3">
                <button
                  onClick={() => {
                    setSelectedRange(null);
                    setNoteText('');
                    window.getSelection()?.removeAllRanges();
                  }}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addAnnotation}
                  disabled={!noteText.trim()}
                  className="inline-flex items-center px-3 py-1.5 bg-amber-600 text-white text-sm rounded-md hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Save className="h-3 w-3 mr-1" />
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {annotations.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-md font-semibold text-gray-900 mb-3">Annotations ({annotations.length})</h4>
          <div className="space-y-3">
            {annotations.map(annotation => (
              <div key={annotation.id} className="bg-white rounded-md p-3 border border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      "{annotation.selectedText}"
                    </p>
                    {editingAnnotation === annotation.id ? (
                      <div className="space-y-2">
                        <textarea
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={2}
                        />
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => {
                              setEditingAnnotation(null);
                              setNoteText('');
                            }}
                            className="px-2 py-1 text-xs text-gray-600 hover:text-gray-800"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => updateAnnotation(annotation.id, noteText)}
                            className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">{annotation.note}</p>
                    )}
                  </div>
                  {!isReadOnly && (
                    <div className="flex items-center space-x-1 ml-3">
                      <button
                        onClick={() => {
                          setEditingAnnotation(annotation.id);
                          setNoteText(annotation.note);
                        }}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <MessageSquare className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => deleteAnnotation(annotation.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}