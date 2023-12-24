'use client';

import { useReducer, useRef } from 'react';
import Button from '@/components/common/buttons/button';
import { Button as ShadcnButton } from '@/components/ui/button';
import MarkdownEditor from '@/components/common/markdown/markdown-editor';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Cross1Icon, PlusIcon } from '@radix-ui/react-icons';
import {
  initialState,
  reducer,
  useWriterForm,
  WriterFormContext,
} from './writer-form-reducer';

// 제어 컴포넌트여야되는 거
// 1. 힌트 (가변 갯수)
// 2. 문제 내용 (최대 텍스트 길이때문에)
// 3. 선택지 (최대 텍스트 길이 + 가변 갯수)
// 4. 정답 내용 (최대 텍스트 길이때문에)

export default function WriterForm() {
  const [form, dispatch] = useReducer(reducer, initialState);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <WriterFormContext.Provider value={{ form, dispatch }}>
      <form onSubmit={onSubmit}>
        <section className="mb-4">
          <Label className="text-lg font-bold" htmlFor="title">
            제목
          </Label>
          <Input
            id="title"
            placeholder="제목을 입력해주세요"
            onChange={(e) =>
              dispatch({
                type: 'SET_TITLE',
                payload: e.target.value,
              })
            }
          />
        </section>
        <section className="mb-4">
          <Label className="text-lg font-bold" htmlFor="summary">
            한 줄 소개
          </Label>
          <Input
            id="summary"
            onChange={(e) =>
              dispatch({
                type: 'SET_SUMMARY',
                payload: e.target.value,
              })
            }
          />
        </section>
        <section className="mb-4">
          <Label className="text-lg font-bold" htmlFor="???">
            난이도
          </Label>
          <Input id="???" />
        </section>
        <section className="mb-4">
          <Label className="text-lg font-bold" htmlFor="hint">
            힌트
          </Label>
          <HintSection />
        </section>
        <section className="mb-4">
          <MarkdownEditor>
            <div className="mb-4 flex items-center justify-between">
              <Label htmlFor="hello" className="grow text-lg font-bold">
                문제 내용
              </Label>
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

        <section className="mb-4">
          <MarkdownEditor>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="grow text-lg font-bold">선택지</h2>
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

        <section className="mb-4">
          <MarkdownEditor>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="grow text-lg font-bold">정답 내용</h2>
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
    </WriterFormContext.Provider>
  );
}

function HintSection() {
  const { form, dispatch } = useWriterForm();
  const hintRef = useRef<HTMLInputElement>(null);

  const addHint = () => {
    if (!hintRef.current || !hintRef.current.value) {
      return;
    }

    const hint = hintRef.current.value;
    hintRef.current.value = '';

    if (form.hints.includes(hint)) {
      return;
    }

    dispatch({
      type: 'ADD_HINT',
      payload: hint,
    });
  };

  const removeHint = (hint: string) => {
    dispatch({
      type: 'REMOVE_HINT',
      payload: hint,
    });
  };

  return (
    <>
      <div className="flex w-full space-x-2">
        <Input
          id="hint"
          autoComplete="off"
          ref={hintRef}
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
        {form.hints.map((hint, idx) => (
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
              onClick={() => removeHint(hint)}
            />
          </Badge>
        ))}
      </div>
    </>
  );
}
