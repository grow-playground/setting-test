import { useSuspenseQuery, useMutation } from '@tanstack/react-query';
import quizOptions from './options';
import quizSubmissionAPI from './api';

export function useGetQuizSubmissions(userId: string) {
  return useSuspenseQuery(quizOptions.submissions(userId));
}

export function useSubmitQuizSubmission() {
  return useMutation({
    mutationFn: quizSubmissionAPI.postSubmission,
  });
}
