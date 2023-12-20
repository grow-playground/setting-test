import NavLink from '@/components/common/link/nav-link';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

export default async function Page({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="p-4">
        <article className="flex w-full">
          <NavLink href={`/quizzes/${params.id}`}>퀴즈</NavLink>
          <NavLink href={`/quizzes/${params.id}/questions`}>질문</NavLink>
        </article>
      </main>
    </HydrationBoundary>
  );
}
