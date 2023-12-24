'use client';

import React, { useState } from 'react';
import { useGetChoicesOfQuiz, useSubmitQuiz } from '@/services/quiz/hooks';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/buttons/button';
import LoadingSpinner from '@/components/common/loading-spinner/loading-spinner';
import MarkDown from '@/components/ui/markdown';

interface ChoiceFormProps {
  quizId: number;
  children?: React.ReactNode;
}

export default function ChoiceForm({ quizId, children }: ChoiceFormProps) {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const { data: choices } = useGetChoicesOfQuiz(quizId);
  const { mutate: submitQuiz, isPending, isSuccess } = useSubmitQuiz();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const choice = choices?.find(
      (choice) => choice.id === Number(formData.get('choice'))
    );

    if (!choice) {
      setErrorMessage('선택지를 선택해주세요.');
      return;
    }

    submitQuiz(
      {
        quizId,
        choiceId: choice.id,
      },
      {
        onSuccess: () => router.push(`/quizzes/${quizId}/answer`),
        onError: (error) => setErrorMessage(error.message),
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      {choices?.map((choice, idx) => (
        <div className="flex flex-col gap-4" key={choice.id}>
          <label className="mt-4 flex gap-2" htmlFor={`${choice.id}`}>
            <input
              id={`${choice.id}`}
              value={`${choice.id}`}
              type="radio"
              name="choice"
              onChange={() => setErrorMessage('')}
            />
            <h2 className="grow font-bold">{idx + 1}번 선택지</h2>
          </label>
          <MarkDown wrapLongLines={true}>{choice.description}</MarkDown>
        </div>
      ))}
      {errorMessage && <p className="my-2 text-red-500">{errorMessage}</p>}
      {children}
      <Button
        className="mt-4 flex h-10 w-full items-center justify-center disabled:bg-blue-500"
        disabled={isPending || isSuccess}
      >
        {isSuccess ? (
          '성공!'
        ) : isPending ? (
          <LoadingSpinner size="lg" weight="sm" />
        ) : (
          '제출하기'
        )}
      </Button>
    </form>
  );
}
