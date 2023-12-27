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

      <QuizTable userId={user?.id} />

      <div className="h-16">
        <div className="fixed bottom-0 h-16 w-[28rem] bg-white">
          혹시 몰라서 추가해 본 바텀시트...
        </div>
      </div>
    </HydrationBoundary>
  );
}
