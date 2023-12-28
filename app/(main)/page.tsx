import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import quizOptions from '@/services/quiz/options';
import QuizTable from './quiz-table';
import BaseHeader from '@/components/common/headers/base-header';

export default async function Page() {
  const queryClient = new QueryClient();

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  await queryClient.prefetchQuery(quizOptions.all(user?.id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BaseHeader />
      <div className="px-5 py-4">
        <QuizTable userId={user?.id} />
      </div>
    </HydrationBoundary>
  );
}
