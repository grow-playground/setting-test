'use client';

import { useRef } from 'react';
import Button from '@/components/common/buttons/button';
import { Button as ShadcnButton } from '@/components/ui/button';
import MarkdownEditor from '@/components/common/markdown/markdown-editor';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Cross1Icon, PlusIcon } from '@radix-ui/react-icons';
import {
  type SubmitHandler,
  useForm,
  FormProvider,
  useFormContext,
  useFieldArray,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// 제어 컴포넌트여야되는 거
// 1. 힌트 (가변 갯수)
// 2. 선택지 (최대 텍스트 길이 + 가변 갯수)

const formSchema = z.object({
  title: z.string().min(1).max(100),
  summary: z.string().min(1).max(100),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  hints: z.array(
    z.object({
      value: z.string().min(1).max(100),
    })
  ),
  description: z.string().min(1).max(100),
  answer: z.string().min(1).max(100),
});

type Inputs = z.infer<typeof formSchema>;

export default function WriterForm() {
  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
  });

  const { register, handleSubmit } = form;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="mb-4">
          <Label className="text-lg font-bold" htmlFor="title">
            제목
          </Label>
          <Input
            id="title"
            placeholder="제목을 입력해주세요"
            {...register('title')}
          />
        </section>
        <section className="mb-4">
          <Label className="text-lg font-bold" htmlFor="summary">
            한 줄 소개
          </Label>
          <Input id="summary" {...register('summary')} />
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
    </FormProvider>
  );
}

function HintSection() {
  const { control } = useFormContext<Inputs>();

  const {
    append,
    fields: hints,
    remove,
  } = useFieldArray({ control, name: 'hints' });

  const inputRef = useRef<HTMLInputElement>(null);

  const addHint = () => {
    if (!inputRef.current || !inputRef.current.value) {
      return;
    }

    const value = inputRef.current.value;
    inputRef.current.value = '';

    if (hints.some((hint) => hint.value === value)) {
      return;
    }

    append({ value });
  };

  const removeHint = (id: string) => {
    remove(hints.findIndex((hint) => hint.id === id));
  };

  return (
    <>
      <div className="flex w-full space-x-2">
        <Input
          id="hint"
          autoComplete="off"
          ref={inputRef}
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
            {hint.value}
            <Cross1Icon
              className="cursor-pointer"
              width={10}
              height={10}
              onClick={() => removeHint(hint.id)}
            />
          </Badge>
        ))}
      </div>
    </>
  );
}
