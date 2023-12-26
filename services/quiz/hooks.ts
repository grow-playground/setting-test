import { useSuspenseQuery, useMutation, useQuery } from '@tanstack/react-query';
import quizOptions from './options';
import quizAPI from './api';

/**
 * @note useGetQuizzes에 useSuspenseQuery를 사용할 시 간혈적으로 문제 풀이 여부 데이터를 받지 못합니다.
 * 현재 추측으로는 해당 함수 내 여러 비동기가 동작하는데 하나의 비동기 동작(await)이 완료되면 suspense에서 완료로 감지(?) 하지 않나 싶습니다.
 */

export function useGetQuizzes() {
  return useQuery(quizOptions.all());
}

export function useGetQuiz(quizId: number) {
  return useSuspenseQuery(quizOptions.detail(quizId));
}

export function useGetSubmittedQuiz(userId: string) {
  return useSuspenseQuery(quizOptions.submitted(userId));
}

export function useGetChoicesOfQuiz(quizId: number) {
  return useSuspenseQuery(quizOptions.choices(quizId));
}

export function useSubmitQuiz() {
  return useMutation({
    mutationFn: quizAPI.postQuizSubmission,
  });
}
