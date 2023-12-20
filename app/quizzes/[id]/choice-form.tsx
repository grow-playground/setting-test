'use client';

import React, { useState } from 'react';
import { useGetChoicesOfQuiz, postQuizSubmission } from '@/hooks/quiz';
import Button from '@/components/common/buttons/button';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function ChoiceForm({ quizId }: { quizId: number }) {
  const { data: choices } = useGetChoicesOfQuiz(quizId);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: postQuizSubmission,
    onSuccess: () => router.push(`/quizzes/${quizId}/answer`),
    onError: (error) => setErrorMessage(error.message),
  });

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

    mutate({
      quizId,
      choiceId: choice.id,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {choices?.map((choice) => (
        <label className="flex gap-2" key={choice.id} htmlFor={`${choice.id}`}>
          <input
            id={`${choice.id}`}
            value={`${choice.id}`}
            type="radio"
            name="choice"
            onChange={() => setErrorMessage('')}
          />
          <p className="my-1.5">{choice.description}</p>
        </label>
      ))}
      {errorMessage ? (
        <p className="my-2 text-red-500">{errorMessage}</p>
      ) : null}
      <Button className="mt-4 w-full">제출하기</Button>
    </form>
  );
}
