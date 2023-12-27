import { queryOptions } from '@tanstack/react-query';
import commentAPI from './api';

const commentOptions = {
  default: ['comments'] as const,

  quiz: (quizId: number) =>
    queryOptions({
      queryKey: [...commentOptions.default, 'quiz', quizId],
      queryFn: () => commentAPI.getCommentsOfQuiz(quizId),
    }),
};

export default commentOptions;
