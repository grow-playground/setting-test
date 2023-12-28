'use client';

import Markdown from '@/components/common/markdown/markdown';
import { useGetAnswersOfQuiz } from '@/services/quiz/hooks';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type QuizAnswerProps = {
  quizId: number;
};

export default function QuizAnswer({ quizId }: QuizAnswerProps) {
  const { data: quizAnswer } = useGetAnswersOfQuiz(quizId);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold">정답</h2>
        <Markdown style={dracula}>{quizAnswer.description}</Markdown>
      </div>

      <div>
        <h3 className="text-lg font-semibold">해설</h3>
        <Markdown style={dracula}>
          {quizAnswer.answer_description ?? ''}
        </Markdown>
      </div>
    </div>
  );
}
