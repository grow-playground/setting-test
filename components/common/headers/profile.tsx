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
    <Link href={user ? `/user/${user.id}` : '/auth'} scroll={false}>
      <div className="flex items-center">
        <Image
          src={UserProfile}
          className="mr-4"
          width={32}
          height={32}
          alt="유저 프로필"
        />
        {user ? (
          <p className="text-center font-bold">{user.user_metadata.name}</p>
        ) : (
          <p className="text-center text-gray-400">로그인을 해주세요.</p>
        )}
      </div>
    </Link>
  );
}
