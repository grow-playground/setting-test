import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import KakaoButton from '../auth/callback/kakao-button';
import TypeTimeLogo from '@/assets/images/type-time-logo.png';
import Image from 'next/image';
import FullButton from '@/components/common/buttons/full-button';
import Button from '@/components/common/buttons/button';
import Header from '@/components/header';
import DataTable from '@/components/quiz/table/data-table';
import { columns } from '@/components/quiz/table/columns';

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

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

  const dummy = [
    {
      id: '1',
      content: {
        title: 'asdaalsdasldkasldkasqwdklq kdlqwdklqw',
        summary: 'asdaalsdasldkasldkasqwdklq kdlqwdklqw',
      },
      difficulty: '중',
      created_at: '',
      updated_at: '',
      success: false,
    },
    {
      id: '2',
      content: {
        title: '2 Get Return Type',
        summary: '함수의 반환 타입을 만들어주세요',
      },
      difficulty: '하',
      created_at: '',
      updated_at: '',
    },
    {
      id: '2',
      content: {
        title: '2 Get Return Type',
        summary: '함수의 반환 타입을 만들어주세요',
      },
      difficulty: '상',
      created_at: '',
      updated_at: '',
      success: true,
    },
  ];

  return (
    <>
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

      <main>
        <div>
          <DataTable columns={columns} data={dummy} />
        </div>

        <FullButton>제출하기(너비 100%)</FullButton>
      </main>

      <div className="h-16">
        <div className="fixed bottom-0 h-16 w-[28rem] bg-white">
          혹시 몰라서 추가해 본 바텀시트...
        </div>
      </div>
    </>
  );
}
