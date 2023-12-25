'use client';

import Button from '@/components/common/buttons/button';
import MarkdownEditor from '@/components/common/markdown/markdown-editor';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Hints from './hints';

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
  choices: z.array(
    z.object({
      value: z.string().min(1).max(100),
    })
  ),
  description: z.string().min(1).max(100),
  answer: z.string().min(1).max(100),
});

export type Inputs = z.infer<typeof formSchema>;

export default function WriterForm() {
  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
  });

  const { register, handleSubmit, watch, setValue } = form;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
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
        <Hints form={form} />
      </section>
      <section className="mb-4 flex flex-col gap-4">
        <MarkdownEditor
          label="문제 내용"
          value={watch('description')}
          onChange={(value) => setValue('description', value ?? '')}
        />
      </section>
      <section className="mb-4 flex flex-col gap-4">
        <MarkdownEditor label="선택지" />
      </section>
      <section className="mb-4 flex flex-col gap-4">
        <MarkdownEditor
          label="정답 내용"
          value={watch('answer')}
          onChange={(value) => setValue('answer', value ?? '')}
        />
      </section>
      <Button className="w-full" type="submit">
        작성 완료
      </Button>
    </form>
  );
}
