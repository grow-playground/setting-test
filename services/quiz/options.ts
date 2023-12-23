import { queryOptions } from '@tanstack/react-query';
import quizAPI from './api';

const quizOptions = {
  default: ['quizzes'] as const,

  all: () =>
    queryOptions({
      queryKey: [...quizOptions.default],
      queryFn: () => quizAPI.getQuizzes(),
    }),

  detail: (quizId: number) =>
    queryOptions({
      queryKey: [...quizOptions.default, 'detail', quizId],
      queryFn: () => quizAPI.getQuiz(quizId),
    }),

  choices: (quizId: number) =>
    queryOptions({
      queryKey: [...quizOptions.detail(quizId).queryKey, 'choices'],
      queryFn: () => quizAPI.getChoicesOfQuiz(quizId),
    }),
};

export default quizOptions;
