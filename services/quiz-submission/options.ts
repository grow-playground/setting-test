import { queryOptions } from '@tanstack/react-query';
import quizSubmissionAPI from './api';

const quizSubmissionOptions = {
  default: ['quizsubmissions'] as const,

  submissions: (userId: string) =>
    queryOptions({
      queryKey: [...quizSubmissionOptions.default, 'submissions', userId],
      queryFn: () => quizSubmissionAPI.getSubmissionsOfUser(userId),
    }),
};

export default quizSubmissionOptions;
