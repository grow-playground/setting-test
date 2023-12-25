'use client';

import Button from '@/components/common/buttons/button';
import MarkdownEditor from '@/components/common/markdown/markdown-editor';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { type SubmitHandler, useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Hints from './hints';
import Choices from './choices';

// 제어 컴포넌트여야되는 거
// 1. 힌트 (가변 갯수)
// 2. 선택지 (최대 텍스트 길이 + 가변 갯수)

const formSchema = z.object({
  title: z.string().min(1).max(100),
  summary: z.string().min(1).max(100),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  hintInput: z.string().min(0).max(100),
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
  answerDescription: z.string().min(1).max(100),
});

export type Inputs = z.infer<typeof formSchema>;

export default function WriterForm() {
  const form = useForm<Inputs>({
    // resolver: zodResolver(formSchema),
  });

  const { register, handleSubmit, watch, setValue } = form;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="mb-4">
        <Label className="mb-2 inline-block text-lg font-bold" htmlFor="title">
          제목
        </Label>
        <Input
          {...register('title')}
          id="title"
          placeholder="제목을 입력해주세요"
        />
      </section>
      <section className="mb-4">
        <Label
          className="mb-2 inline-block text-lg font-bold"
          htmlFor="summary"
        >
          한 줄 소개
        </Label>
        <Input
          {...register('summary')}
          id="summary"
          placeholder="한 줄 소개를 입력해주세요"
        />
      </section>
      <section className="mb-4">
        <Label className="mb-2 inline-block text-lg font-bold" htmlFor="???">
          난이도
        </Label>
        <Input id="???" placeholder="난이도를 선택해주세요" />
      </section>
      <section className="mb-4">
        <Label className="mb-2 inline-block text-lg font-bold" htmlFor="hint">
          힌트
        </Label>
        <Hints form={form} />
      </section>
      <section className="mb-4 flex flex-col gap-4">
        <MarkdownEditor
          label="문제"
          value={watch('description')}
          onChange={(value) => setValue('description', value ?? '')}
        />
      </section>
      <section className="mb-4">
        <Choices form={form} />
      </section>
      <section className="mb-4">
        <Label className="mb-2 inline-block text-lg font-bold" htmlFor="hint">
          정답
        </Label>
        <div className="flex justify-around">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index}>
              <input
                className="me-2"
                type="radio"
                id={`${index}`}
                name="answer"
                value={`${index}`}
              />
              <label htmlFor={`${index}`}>{index + 1}번</label>
            </div>
          ))}
        </div>
      </section>
      <section className="mb-4 flex flex-col gap-4">
        <MarkdownEditor
          label="정답 해설"
          value={watch('answerDescription')}
          onChange={(value) => setValue('answerDescription', value ?? '')}
        />
      </section>
      <Button className="w-full" type="submit">
        작성 완료
      </Button>
    </form>
  );
}
