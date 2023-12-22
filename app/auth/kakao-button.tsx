'use client';

import Button from '@/components/common/buttons/button';
import { createClient } from '@/utils/supabase/client';

export default function KakaoButton() {
  const supabase = createClient();

  const signInWithKakao = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return <Button onClick={signInWithKakao}>카카오 로그인</Button>;
}
