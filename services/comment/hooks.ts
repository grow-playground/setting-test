import { useSuspenseQuery } from '@tanstack/react-query';
import commentOptions from './options';

export function useGetCommentsOfQuiz(quizId: number) {
  return useSuspenseQuery(commentOptions.quiz(quizId));
}
