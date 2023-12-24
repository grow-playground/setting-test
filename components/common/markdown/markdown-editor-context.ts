import { createContext } from 'react';

const MarkdownEditorContext = createContext<{
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  previewMode: boolean;
  setPreviewMode: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  value: '',
  setValue: () => {},
  previewMode: false,
  setPreviewMode: () => {},
});

export default MarkdownEditorContext;
