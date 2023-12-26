'use client';

import Button from '@/components/common/buttons/button';
import MarkdownEditor from '@/components/common/markdown/markdown-editor';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { type SubmitHandler, type SubmitErrorHandler } from 'react-hook-form';
import Hints from './hints';
import Choices from './choices';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Inputs, useWriterForm } from './writer-form-schema';

export default function WriterForm() {
  const form = useWriterForm();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  const onError: SubmitErrorHandler<Inputs> = (errors) => {
    console.error(errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <section className="mb-4">
        <div className="flex justify-between gap-4">
          <section className="grow">
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
          </section>
          <section className="w-24">
            <Label
              className="mb-2 inline-block text-lg font-bold"
              htmlFor="difficulty"
            >
              난이도
            </Label>
            <Select
              onValueChange={(value) => {
                setValue('difficulty', value as Inputs['difficulty']);
                setError('difficulty', {});
              }}
            >
              <SelectTrigger className="bg-white" id="difficulty">
                <SelectValue placeholder="선택" />
              </SelectTrigger>
              <SelectContent {...register('difficulty')}>
                <SelectItem value="easy">쉬움</SelectItem>
                <SelectItem value="medium">보통</SelectItem>
                <SelectItem value="hard">어려움</SelectItem>
              </SelectContent>
            </Select>
          </section>
        </div>
        {errors.title && (
          <p className="mt-2 text-sm text-red-500">{errors.title.message}</p>
        )}
        {errors.difficulty && (
          <p className="mt-2 text-sm text-red-500">
            {errors.difficulty.message}
          </p>
        )}
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
        {errors.summary && (
          <p className="mt-2 text-sm text-red-500">{errors.summary.message}</p>
        )}
      </section>

      <section className="mb-4">
        <Label className="mb-2 inline-block text-lg font-bold" htmlFor="hint">
          힌트
        </Label>
        <Hints form={form} />
      </section>

      <section className="mb-4">
        <MarkdownEditor
          label="문제"
          headerStyle="mb-4"
          value={watch('description')}
          onChange={(value) => setValue('description', value ?? '')}
        />
        {errors.description && (
          <p className="mt-2 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
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
                {...register('answer')}
                className="me-2"
                type="radio"
                id={`answer-${index + 1}`}
                value={index + 1}
              />
              <label htmlFor={`answer-${index + 1}`}>{index + 1}번</label>
            </div>
          ))}
        </div>
        {errors.answer && (
          <p className="mt-2 text-sm text-red-500">{errors.answer.message}</p>
        )}
      </section>

      <section className="mb-4">
        <MarkdownEditor
          label="정답 해설"
          headerStyle="mb-4"
          value={watch('answerDescription')}
          onChange={(value) => setValue('answerDescription', value ?? '')}
        />
        {errors.answerDescription && (
          <p className="mt-2 text-sm text-red-500">
            {errors.answerDescription.message}
          </p>
        )}
      </section>

      <Button className="w-full" type="submit">
        작성 완료
      </Button>
    </form>
  );
}
