import { useSuspenseQuery, useMutation } from '@tanstack/react-query';
import quizOptions from './options';
import quizSubmissionAPI from './api';

export function useGetQuizSubmissions(userId: string) {
  return useSuspenseQuery(quizOptions.all(userId));
}

export function useGetQuizSubmission(userId: string, quizId: number) {
  return useSuspenseQuery(quizOptions.detailByQuiz(userId, quizId));
}

export function useSubmitQuizSubmission() {
  return useMutation({
    mutationFn: quizSubmissionAPI.postSubmission,
  });
}
