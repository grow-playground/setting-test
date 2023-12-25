'use client';

import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import Markdown from './markdown';
import { Label } from '@/components/ui/label';
import Button from '@/components/common/buttons/button';

type MarkdownEditorProps = React.ComponentProps<typeof MDEditor> & {
  label: string;
};

export default function MarkdownEditor({
  label,
  value,
  onChange,
  ...props
}: MarkdownEditorProps) {
  const [isPreview, setIsPreview] = useState(false);

  const toggle = () => setIsPreview(!isPreview);

  return (
    <>
      <div className="flex items-center justify-between">
        <Label className="grow text-lg font-bold">{label}</Label>
        <Button type="button" size="small" onClick={toggle}>
          {isPreview ? '편집하기' : '미리보기'}
        </Button>
      </div>
      <div>
        {isPreview ? (
          <Markdown>{value ?? ''}</Markdown>
        ) : (
          <MDEditor
            value={value}
            onChange={onChange}
            hideToolbar
            height="auto"
            preview="edit"
            {...props}
          />
        )}
      </div>
    </>
  );
}
