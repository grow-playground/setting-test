import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: quizzes } = await supabase.from('quizzes').select('*');

  return NextResponse.json({ quizzes });
}
