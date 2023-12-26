import { useSuspenseQuery, useMutation } from '@tanstack/react-query';
import quizOptions from './options';
import quizAPI from './api';

export function useGetQuiz(quizId: number) {
  return useSuspenseQuery(quizOptions.detail(quizId));
}

export function useGetChoicesOfQuiz(quizId: number) {
  return useSuspenseQuery(quizOptions.choices(quizId));
}

export function useSubmitQuiz() {
  return useMutation({
    mutationFn: quizAPI.postQuizSubmission,
  });
}
