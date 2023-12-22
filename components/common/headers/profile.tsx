import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import UserProfile from '@/assets/images/user-profile.png';

export default async function Profile() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <Link href={user ? '/' : '/auth'} scroll={false}>
      <Image
        src={UserProfile}
        className="mr-4"
        width={32}
        height={32}
        alt="유저 프로필"
      />
    </Link>
  );
}
