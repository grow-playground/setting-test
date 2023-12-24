'use client';

import { useRef, useState } from 'react';
import Button from '@/components/common/buttons/button';
import { Button as ShadcnButton } from '@/components/ui/button';
import MarkdownEditor from '@/components/common/markdown/markdown-editor';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Cross1Icon, PlusIcon } from '@radix-ui/react-icons';

export default function WriterForm() {
  const [hints, setHints] = useState<string[]>([]);
  const hintRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const addHint = () => {
    if (!hintRef.current || !hintRef.current.value) {
      return;
    }

    const hint = hintRef.current.value;

    if (hints.includes(hint)) {
      return;
    }

    hintRef.current.value = '';
    setHints((prev) => [...prev, hint]);
  };

  const removeHint = (idx: number) => {
    setHints((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <form onSubmit={onSubmit}>
      <section className="mb-4">
        <Label className="text-lg font-bold" htmlFor="title">
          제목
        </Label>
        <Input id="title" />
      </section>
      <section className="mb-4">
        <Label className="text-lg font-bold" htmlFor="hint">
          힌트
        </Label>
        <div className="flex w-full space-x-2">
          <Input
            id="hint"
            ref={hintRef}
            autoComplete="off"
            onKeyDown={(e) => e.key === 'Enter' && addHint()}
          />
          <ShadcnButton
            type="button"
            variant="secondary"
            size="icon"
            onClick={() => addHint()}
          >
            <PlusIcon />
          </ShadcnButton>
        </div>
        <div className="mt-2 flex gap-2">
          {hints.map((hint, idx) => (
            <Badge
              key={idx}
              className="flex items-center gap-1"
              variant="secondary"
            >
              {hint}
              <Cross1Icon
                className="cursor-pointer"
                width={10}
                height={10}
                onClick={() => removeHint(idx)}
              />
            </Badge>
          ))}
        </div>
      </section>
      <section className="mb-4">
        <MarkdownEditor>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="grow text-lg font-bold">문제 내용</h2>
            <MarkdownEditor.PreviewToggler>
              {({ isPreview, toggle }) => (
                <Button type="button" size="small" onClick={toggle}>
                  {isPreview ? '편집하기' : '미리보기'}
                </Button>
              )}
            </MarkdownEditor.PreviewToggler>
          </div>
          <MarkdownEditor.Content />
        </MarkdownEditor>
      </section>
      <Button className="w-full" type="submit">
        작성 완료
      </Button>
    </form>
  );
}
