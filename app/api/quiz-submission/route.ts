import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const validateBody = await request
    .json()
    .then((body) =>
      z.object({ quizId: z.number(), choiceId: z.number() }).safeParse(body)
    );

  if (!validateBody.success) {
    return NextResponse.json(
      { error: '필드가 올바르지 않습니다.' },
      { status: 400 }
    );
  }

  const { quizId, choiceId } = validateBody.data;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: '로그인이 필요합니다.' },
      { status: 401 }
    );
  }

  const { data: answerChoice } = await supabase
    .from('choices')
    .select(`*`)
    .match({ quiz_id: quizId, answer: true })
    .single();

  await supabase.from('quizsubmissions').upsert({
    user_id: user?.id,
    quiz_id: quizId,
    success: choiceId === answerChoice?.id,
    updated_at: new Date().toISOString(),
  });

  if (choiceId !== answerChoice?.id) {
    return NextResponse.json(
      { error: '틀렸어요! 다시 고민해주세요.' },
      { status: 400 }
    );
  }

  return NextResponse.json({ data: '정답!' });
}
