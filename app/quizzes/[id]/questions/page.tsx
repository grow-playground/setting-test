import NavLink from '@/components/common/link/nav-link';

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <main className="p-4">
      <article className="flex w-full">
        <NavLink href={`/quizzes/${params.id}`}>퀴즈</NavLink>
        <NavLink href={`/quizzes/${params.id}/questions`}>질문</NavLink>
      </article>
    </main>
  );
}
