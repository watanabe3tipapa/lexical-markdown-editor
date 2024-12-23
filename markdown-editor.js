import React, { useState } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot, $getSelection, EditorState } from 'lexical';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { CodeNode } from '@lexical/code';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';

import './MarkdownEditor.css';

const theme = {
  root: 'p-4 border rounded min-h-[300px] bg-white text-black',
  paragraph: 'mb-2',
  quote: 'border-l-4 border-gray-300 pl-4 italic',
  heading: {
    h1: 'text-3xl font-bold mb-4',
    h2: 'text-2xl font-bold mb-3',
    h3: 'text-xl font-bold mb-2',
  },
  code: 'bg-gray-100 p-2 rounded font-mono text-sm overflow-x-auto block',
};

function onError(error) {
  console.error(error);
}

function MarkdownPreview({ editorState }) {
  const [markdown, setMarkdown] = useState('');

  function convertEditorStateToMarkdown(editorState) {
    // Implement markdown conversion logic here
    const jsonString = JSON.stringify(editorState);
    return jsonString; // Placeholder conversion
  }

  React.useEffect(() => {
    if (editorState) {
      const markdownContent = convertEditorStateToMarkdown(editorState);
      setMarkdown(markdownContent);
    }
  }, [editorState]);

  return (
    <div className="markdown-preview mt-4 p-4 border rounded bg-gray-50">
      <h2 className="text-xl font-bold mb-2">Preview</h2>
      <pre className="whitespace-pre-wrap">{markdown}</pre>
    </div>
  );
}

function OnChangePlugin({ onChange }) {
  const [editor] = useLexicalComposerContext();
  
  React.useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
  }, [editor, onChange]);
  
  return null;
}

export default function MarkdownEditor() {
  const [editorState, setEditorState] = useState(null);

  const initialConfig = {
    namespace: 'MarkdownEditor',
    theme,
    onError,
    nodes: [HeadingNode, QuoteNode, CodeNode],
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">Lexical Markdown Editor</h1>
      <LexicalComposer initialConfig={initialConfig}>
        <div className="editor-container">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<div className="editor-placeholder">Start typing...</div>}
          />
          <HistoryPlugin />
          <MarkdownShortcutPlugin />
          <OnChangePlugin onChange={setEditorState} />
        </div>
      </LexicalComposer>
      <MarkdownPreview editorState={editorState} />
    </div>
  );
}
