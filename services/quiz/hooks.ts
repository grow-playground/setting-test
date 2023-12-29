import { useSuspenseQuery, useMutation } from '@tanstack/react-query';
import quizOptions from './options';
import quizAPI from './api';

export function useGetQuizzes(userId?: string) {
  return useSuspenseQuery(quizOptions.all(userId));
}

export function useGetQuiz(quizId: number) {
  return useSuspenseQuery(quizOptions.detail(quizId));
}

export function useGetChoicesOfQuiz(quizId: number) {
  return useSuspenseQuery(quizOptions.choices(quizId));
}

export function useGetAnswersOfQuiz(quizId: number) {
  return useSuspenseQuery(quizOptions.answers(quizId));
}

export function useCreateQuiz() {
  return useMutation({
    mutationFn: quizAPI.postQuiz,
  });
}
