import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import commentOptions from './options';
import commentAPI from './api';

export function useGetCommentsOfQuiz(quizId: number) {
  return useSuspenseQuery(commentOptions.quiz(quizId));
}

export function usePostCommentOfQuiz() {
  return useMutation({
    mutationFn: commentAPI.postCommentOfQuiz,
  });
}
