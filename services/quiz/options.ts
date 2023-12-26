import { queryOptions } from '@tanstack/react-query';
import quizAPI from './api';

const quizOptions = {
  all: ['quizzes'] as const,

  detail: (quizId: number) =>
    queryOptions({
      queryKey: [...quizOptions.all, 'detail', quizId],
      queryFn: () => quizAPI.getQuiz(quizId),
    }),

  submitted: (userId: string) =>
    queryOptions({
      queryKey: [...quizOptions.all, 'submitted', userId],
      queryFn: () => quizAPI.getSubmittedQuiz(userId),
    }),

  choices: (quizId: number) =>
    queryOptions({
      queryKey: [...quizOptions.detail(quizId).queryKey, 'choices'],
      queryFn: () => quizAPI.getChoicesOfQuiz(quizId),
    }),

  hints: (quizId: number) =>
    queryOptions({
      queryKey: [...quizOptions.detail(quizId).queryKey, 'hints'],
      queryFn: () => quizAPI.getHintsOfQuiz(quizId),
    }),
};

export default quizOptions;
