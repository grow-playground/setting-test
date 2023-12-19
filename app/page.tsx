import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import KakaoButton from './auth/callback/kakao-button';

export default async function Index() {
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

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      {user ? (
        <form
          className="w-full rounded-xl bg-slate-100 px-4 py-2 text-center"
          action={signOut}
        >
          <button>로그아웃</button>
        </form>
      ) : (
        <KakaoButton />
      )}
    </div>
  );
}
