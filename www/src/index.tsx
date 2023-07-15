import React from 'react';
import { createRoot } from 'react-dom/client';
import { glob, setup } from 'goober';
import MarkdownPreviewExample from '@uiw/react-markdown-preview-example';
import data from '@uiw/react-xml-reader/README.md';
import App from './App';

setup(React.createElement);

glob`
  [data-color-mode*='dark'], [data-color-mode*='dark'] body {
    --tabs-bg: #5f5f5f;
  }
  [data-color-mode*='light'], [data-color-mode*='light'] body {
    background-color: #f2f2f2;
    --tabs-bg: #bce0ff;
  }
  * {
    box-sizing: border-box;
  }
`;

const Github = MarkdownPreviewExample.Github;
const Example = MarkdownPreviewExample.Example;

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <MarkdownPreviewExample
    source={data.source}
    components={data.components}
    data={data.data}
    title="XML Reader for React"
    description="React component that handles xml file input and its parsing."
    version={`v${VERSION}`}
  >
    <Github href="https://github.com/uiwjs/react-xml-reader" />
    <Example>
      <App />
    </Example>
  </MarkdownPreviewExample>
);
