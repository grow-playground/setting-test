'use client';

import React, { useContext, useState } from 'react';
import MarkdownEditorContext from './markdown-editor-context';
import MDEditor from '@uiw/react-md-editor';
import Markdown from './markdown';

// export default function MarkdownEditor() {
//   const [value, setValue] = useState('**Hello world!!!**');
//   const [previewMode, setPreviewMode] = useState(false);

//   return (
//     <>
//       <Button onClick={() => setPreviewMode(!previewMode)}>
//         {previewMode ? '편집하기' : '미리보기'}
//       </Button>
//       {previewMode ? (
//         <Markdown>{value}</Markdown>
//       ) : (
//         <MDEditor
//           value={value}
//           onChange={(value) => setValue(value ?? '')}
//           hideToolbar
//           height="auto"
//           preview="edit"
//         />
//       )}
//     </>
//   );
// }

export default function MarkdownEditor({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [value, setValue] = useState('**Hello world!!!**');
  const [previewMode, setPreviewMode] = useState(false);

  const contextValue = { value, setValue, previewMode, setPreviewMode };

  return (
    <MarkdownEditorContext.Provider value={contextValue}>
      {children}
    </MarkdownEditorContext.Provider>
  );
}

MarkdownEditor.Content = function Content() {
  const { value, setValue, previewMode } = useContext(MarkdownEditorContext);

  return (
    <>
      {previewMode ? (
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

MarkdownEditor.Toggler = function Toggler({
  children,
}: {
  children?:
    | React.ReactNode
    | ((props: {
        previewMode: boolean;
        toggle: VoidFunction;
      }) => React.ReactNode);
}) {
  const { previewMode, setPreviewMode } = useContext(MarkdownEditorContext);

  const toggle = () => setPreviewMode(!previewMode);

  return (
    <>
      {typeof children === 'function'
        ? children({ previewMode, toggle })
        : children}
    </>
  );
};
