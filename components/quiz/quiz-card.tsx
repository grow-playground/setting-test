import Image from 'next/image';
import CorrectIcon from '@/assets/svgs/correct-icon.svg';
import WrongIcon from '@/assets/svgs/wrong-icon.svg';

type QuizCardProps = {
  status?: 'correct' | 'wrong' | 'none';
  difficulty: 'easy' | 'medium' | 'hard';
  title: string;
  summary: string;
};

export function QuizCard({
  status = 'none',
  difficulty,
  title,
  summary,
}: QuizCardProps) {
  return (
    <div className="relative flex h-20 justify-between rounded-lg bg-slate-100 py-4 pl-12 pr-3 shadow-md">
      <div className="absolute left-2 top-1/2 h-6 w-6 shrink-0 -translate-y-5">
        {status === 'correct' && <Image src={CorrectIcon} fill alt="정답" />}
        {status === 'wrong' && <Image src={WrongIcon} fill alt="오답" />}
      </div>

      <div className="min-w-0">
        <h2 className="truncate text-xl font-bold">{title}</h2>
        <p className="truncate">{summary}</p>
      </div>

      <div>{difficulty}</div>
    </div>
  );
}
