import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import TypeTimeLogo from '@/assets/images/type-time-logo.png';
import Image from 'next/image';
import Button from '@/components/common/buttons/button';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import quizOptions from '@/services/quiz/options';
import QuizTable from './quiz-table';
import KakaoButton from '../auth/kakao-button';
import Header from '@/components/common/headers/header';

export default async function Page() {
  const queryClient = new QueryClient();

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  await queryClient.prefetchQuery(quizOptions.all(user?.id));

  const signOut = async () => {
    'use server';

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    await supabase.auth.signOut();
  };

  const HeaderRightArea = user ? (
    <form action={signOut}>
      <Button className="h-full">로그아웃</Button>
    </form>
  ) : (
    <KakaoButton />
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Header
        leftArea={
          <Image
            src={TypeTimeLogo}
            alt="타입타임 로고"
            width={158}
            height={63}
            priority
          />
        }
        rightArea={HeaderRightArea}
      />

      <QuizTable userId={user?.id} />

      <div className="h-16">
        <div className="fixed bottom-0 h-16 w-[28rem] bg-white">
          혹시 몰라서 추가해 본 바텀시트...
        </div>
      </div>
    </HydrationBoundary>
  );
}
