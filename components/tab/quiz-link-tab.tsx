import NavLink from '@/components/common/link/nav-link';
import { twMerge } from 'tailwind-merge';

interface QuizLinkTabProps {
  className?: string;
  quizId: string;
}

export default function QuizLinkTab({ className, quizId }: QuizLinkTabProps) {
  return (
    <article className={twMerge('flex w-full', className)}>
      <NavLink className="grow" href={`/quizzes/${quizId}`}>
        퀴즈
      </NavLink>
      <NavLink className="grow" href={`/quizzes/${quizId}/questions`}>
        질문
      </NavLink>
    </article>
  );
}
