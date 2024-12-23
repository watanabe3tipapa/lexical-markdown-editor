import React from 'react';
import MarkdownEditor from './MarkdownEditor';
import './App.css';
import './MarkdownEditor.css';

function App() {
  return (
    <div className="App min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <MarkdownEditor />
      </div>
    </div>
  );
}

export default App;
