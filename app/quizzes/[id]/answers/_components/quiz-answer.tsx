'use client';

import MarkDown from '@/components/ui/markdown';
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
        <MarkDown style={dracula}>{quizAnswer.description}</MarkDown>
      </div>

      <div>
        <h3 className="text-lg font-semibold">해설</h3>
        <MarkDown style={dracula}>
          {quizAnswer.answer_description ?? ''}
        </MarkDown>
      </div>
    </div>
  );
}
