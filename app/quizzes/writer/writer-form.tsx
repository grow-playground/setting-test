'use client';

import Button from '@/components/common/buttons/button';
import MarkdownEditor from '@/components/common/markdown/markdown-editor';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { type SubmitHandler, useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
import Hints from './hints';
import Choices from './choices';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Inputs } from './writer-form-schema';

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
        <div className="flex justify-between gap-4">
          <div className="grow">
            <Label
              className="mb-2 inline-block text-lg font-bold"
              htmlFor="title"
            >
              제목
            </Label>
            <Input
              {...register('title')}
              className="bg-white"
              id="title"
              placeholder="제목을 입력해주세요"
              autoComplete="off"
            />
          </div>
          <div className="w-24">
            <Label
              className="mb-2 inline-block text-lg font-bold"
              htmlFor="difficulty"
            >
              난이도
            </Label>
            <Select
              onValueChange={(value) =>
                setValue('difficulty', value as Inputs['difficulty'])
              }
            >
              <SelectTrigger className="bg-white" id="difficulty">
                <SelectValue placeholder="선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">쉬움</SelectItem>
                <SelectItem value="medium">보통</SelectItem>
                <SelectItem value="hard">어려움</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
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
          className="bg-white"
          id="summary"
          placeholder="한 줄 소개를 입력해주세요"
          autoComplete="off"
        />
        <p className="mt-2 text-sm text-gray-600">
          어떤 문제인지 간략하게 소개해주세요.
        </p>
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
