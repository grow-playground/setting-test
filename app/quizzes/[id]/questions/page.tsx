import QuizLinkTab from '@/components/tab/quiz-link-tab';

export default async function Page({ params }: { params: { id: string } }) {
  const quizId = Number(params.id) ?? 0;

  return (
    <main className="p-4">
      <QuizLinkTab className="mb-2" quizId={`${quizId}`} />
    </main>
  );
}
