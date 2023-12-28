'use client';

import Button from '@/components/common/buttons/button';
import MarkdownEditor from '@/components/common/markdown/markdown-editor';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { type SubmitHandler, type SubmitErrorHandler } from 'react-hook-form';
import Hints from './hints';
import Choices from './choices';
import TitleAndDifficulty from './title-and-difficulty';
import { Inputs, useWriterForm, formLiteral } from './writer-form-schema';
import { useCreateQuiz } from '@/services/quiz/hooks';
import LoadingSpinner from '@/components/common/loading-spinner/loading-spinner';
import { useRouter } from 'next/navigation';

export default function WriterForm() {
  const form = useWriterForm();
  const router = useRouter();

  const { mutate: createQuiz, isPending, isSuccess } = useCreateQuiz();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    trigger,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createQuiz(data, {
      onSuccess: (quiz) => router.push(`/quizzes/${quiz.id}`),
      onError: (error) => setError('root', { message: error.message }),
    });
  };

  const onError: SubmitErrorHandler<Inputs> = (errors) => {
    console.error(errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <section className="mb-4">
        <TitleAndDifficulty form={form} />
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
          maxLength={formLiteral.summary.max.value}
        />
        <p className="mt-2 text-sm text-gray-600">
          어떤 퀴즈인지 간략하게 소개해주세요.
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
          onBlur={() => trigger(['description'])}
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
          {Array.from({ length: formLiteral.choices.length }).map(
            (_, index) => (
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
            )
          )}
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
          onBlur={() => trigger(['answerDescription'])}
        />
        {errors.answerDescription && (
          <p className="mt-2 text-sm text-red-500">
            {errors.answerDescription.message}
          </p>
        )}
      </section>

      {errors.root && (
        <p className="mt-2 text-sm text-red-500">{errors.root.message}</p>
      )}

      <Button
        className="mt-4 flex h-10 w-full items-center justify-center disabled:bg-blue-primary"
        disabled={isPending || isSuccess}
      >
        {isSuccess ? (
          '성공!'
        ) : isPending ? (
          <LoadingSpinner size="lg" weight="sm" />
        ) : (
          '퀴즈 만들기'
        )}
      </Button>
    </form>
  );
}
