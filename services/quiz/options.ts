import { queryOptions } from '@tanstack/react-query';
import quizAPI from './api';

const quizOptions = {
  default: ['quizzes'] as const,

  all: (userId?: string) =>
    queryOptions({
      queryKey: [...quizOptions.default, userId],
      queryFn: () => quizAPI.getQuizzes(userId),
    }),

  detail: (quizId: number) =>
    queryOptions({
      queryKey: [...quizOptions.default, 'detail', quizId],
      queryFn: () => quizAPI.getQuiz(quizId),
    }),

  submitted: (userId: string) =>
    queryOptions({
      queryKey: [...quizOptions.all().queryKey, 'submitted', userId],
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

  answers: (quizId: number) =>
    queryOptions({
      queryKey: [...quizOptions.detail(quizId).queryKey, 'answers'],
      queryFn: () => quizAPI.getAnswersOfQuiz(quizId),
    }),
};

export default quizOptions;
