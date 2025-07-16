'use client';

import { Editor } from '@monaco-editor/react';
import { useTheme } from '@/components/theme-provider';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  theme?: string;
  height?: string;
}

export function CodeEditor({ 
  value, 
  onChange, 
  language = 'typescript', 
  theme = 'vs-dark',
  height = '100%' 
}: CodeEditorProps) {
  const { theme: currentTheme } = useTheme();
  
  const editorTheme = currentTheme === 'light' ? 'light' : 'vs-dark';

  return (
    <div className="h-full">
      <Editor
        height={height}
        defaultLanguage={language}
        value={value}
        onChange={(value) => onChange(value || '')}
        theme={theme || editorTheme}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineHeight: 1.5,
          padding: { top: 16, bottom: 16 },
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          formatOnPaste: true,
          formatOnType: true,
          autoIndent: 'advanced',
          tabSize: 2,
          insertSpaces: true,
          wordWrap: 'on',
          lineNumbers: 'on',
          glyphMargin: true,
          folding: true,
          lineDecorationsWidth: 0,
          lineNumbersMinChars: 3,
          renderLineHighlight: 'gutter',
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
}