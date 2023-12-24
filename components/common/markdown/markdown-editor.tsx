'use client';

import React, { useContext, useState } from 'react';
import MarkdownEditorContext from './markdown-editor-context';
import MDEditor from '@uiw/react-md-editor';
import Markdown from './markdown';

export default function MarkdownEditor({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [value, setValue] = useState('**Hello world!!!**');
  const [isPreview, setIsPreview] = useState(false);

  const contextValue = { value, setValue, isPreview, setIsPreview };

  return (
    <MarkdownEditorContext.Provider value={contextValue}>
      {children}
    </MarkdownEditorContext.Provider>
  );
}

MarkdownEditor.Content = function Content() {
  const { value, setValue, isPreview } = useContext(MarkdownEditorContext);

  return (
    <>
      {isPreview ? (
        <Markdown>{value}</Markdown>
      ) : (
        <MDEditor
          value={value}
          onChange={(value) => value && setValue(value)}
          hideToolbar
          height="auto"
          preview="edit"
        />
      )}
    </>
  );
};

MarkdownEditor.PreviewToggler = function PreviewToggler({
  children,
}: {
  children?:
    | React.ReactNode
    | ((props: {
        isPreview: boolean;
        toggle: VoidFunction;
      }) => React.ReactNode);
}) {
  const { isPreview, setIsPreview } = useContext(MarkdownEditorContext);

  const toggle = () => setIsPreview(!isPreview);

  return (
    <>
      {typeof children === 'function'
        ? children({ isPreview, toggle })
        : children}
    </>
  );
};
