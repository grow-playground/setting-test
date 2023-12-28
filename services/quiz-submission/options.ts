import { queryOptions } from '@tanstack/react-query';
import quizSubmissionAPI from './api';

const quizSubmissionOptions = {
  default: ['quizsubmissions'] as const,

  all: (userId: string) =>
    queryOptions({
      queryKey: [...quizSubmissionOptions.default, userId],
      queryFn: () => quizSubmissionAPI.getSubmissionsOfUser(userId),
    }),

  detailByQuiz: (userId: string, quizId: number) => ({
    queryKey: [...quizSubmissionOptions.default, userId, quizId],
    queryFn: () => quizSubmissionAPI.getSubmissionOfUser(userId, quizId),
  }),
};

export default quizSubmissionOptions;
