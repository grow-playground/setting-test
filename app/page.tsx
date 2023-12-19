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
    <>
      <header className="sticky top-0 h-12 bg-sky-200">나는 헤더</header>
      <main>
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
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, libero
          impedit ipsum at dolores hic, eos officiis qui quam laborum ipsa
          harum. Sed officiis, expedita doloremque repudiandae vero eum
          aspernatur. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Nisi, libero impedit ipsum at dolores hic, eos officiis qui quam
          laborum ipsa harum. Sed officiis, expedita doloremque repudiandae vero
          eum aspernatur. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Nisi, libero impedit ipsum at dolores hic, eos officiis qui quam
          laborum ipsa harum. Sed officiis, expedita doloremque repudiandae vero
          eum aspernatur. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Nisi, libero impedit ipsum at dolores hic, eos officiis qui quam
          laborum ipsa harum. Sed officiis, expedita doloremque repudiandae vero
          eum aspernatur. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Nisi, libero impedit ipsum at dolores hic, eos officiis qui quam
          laborum ipsa harum. Sed officiis, expedita doloremque repudiandae vero
          eum aspernatur. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Nisi, libero impedit ipsum at dolores hic, eos officiis qui quam
          laborum ipsa harum. Sed officiis, expedita doloremque repudiandae vero
          eum aspernatur. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Nisi, libero impedit ipsum at dolores hic, eos officiis qui quam
          laborum ipsa harum. Sed officiis, expedita doloremque repudiandae vero
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, libero
          impedit ipsum at dolores hic, eos officiis qui quam laborum ipsa
          harum. Sed officiis, expedita doloremque repudiandae vero eum
          aspernatur. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Nisi, libero impedit ipsum at dolores hic, eos officiis qui quam
          laborum ipsa harum. Sed officiis, expedita doloremque repudiandae vero
          eum aspernatur. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Nisi, libero impedit ipsum at dolores hic, eos officiis qui quam
          laborum ipsa harum. Sed officiis, expedita doloremque repudiandae vero
          eum aspernatur. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Nisi, libero impedit ipsum at dolores hic, eos officiis qui quam
          laborum ipsa harum. Sed officiis, expedita doloremque repudiandae vero
          eum aspernatur. eum aspernatur. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Nisi, libero impedit ipsum at dolores hic, eos
          officiis qui quam laborum ipsa harum. Sed officiis, expedita
          doloremque repudiandae vero eum aspernatur. asdasdasdasdasdasd
        </div>
      </main>
      <div className="sticky bottom-0 h-12 bg-sky-200">나는 바텀시트</div>
    </>
  );
}
