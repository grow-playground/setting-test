'use client';

import React from 'react';
import { useGetChoicesOfQuiz } from '@/hooks/quiz';
import Button from '@/components/common/buttons/button';

export default function ChoiceForm({ quizId }: { quizId: number }) {
  const { data: choices } = useGetChoicesOfQuiz(quizId);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const choice = formData.get('choice');
    console.log(choice);
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
          />
          <p className="my-1.5">{choice.description}</p>
        </label>
      ))}
      <Button className="mt-4 w-full">제출하기</Button>
    </form>
  );
}
