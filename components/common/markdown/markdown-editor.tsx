'use client';

import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import Markdown from './markdown';
import { Label } from '@/components/ui/label';
import Button from '@/components/common/buttons/button';
import { cn } from '@/libs/utils';

type MarkdownEditorProps = React.ComponentProps<typeof MDEditor> & {
  label: string;
  headerStyle?: string;
};

export default function MarkdownEditor({
  label,
  headerStyle,
  value,
  onChange,
  ...props
}: MarkdownEditorProps) {
  const [isPreview, setIsPreview] = useState(false);

  const toggle = () => setIsPreview((prev) => !prev);

  return (
    <>
      <div className={cn('flex items-center justify-between', headerStyle)}>
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
