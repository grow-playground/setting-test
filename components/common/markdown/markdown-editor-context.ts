import { createContext } from 'react';

const MarkdownEditorContext = createContext<{
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  isPreview: boolean;
  setIsPreview: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  value: '',
  setValue: () => {},
  isPreview: false,
  setIsPreview: () => {},
});

export default MarkdownEditorContext;
