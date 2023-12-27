import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import HamburgerIcon from '@/assets/svgs/hamburger-icon.svg';
import LogoutIcon from '@/assets/svgs/logout-icon.svg';
import ProfileIcon from '@/assets/svgs/profile-icon.svg';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from '@/components/ui/sheet';
import Image from 'next/image';
import Profile from './profile';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default async function Menu() {
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
    <Sheet>
      <SheetTrigger asChild className="cursor-pointer">
        <Image
          src={HamburgerIcon}
          className="mr-4"
          width={30}
          height={30}
          alt="메뉴"
        />
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col justify-between">
        <div className="mt-4">
          <Profile />
          <Separator className="my-4" />

          <Link
            href={user ? '/my' : '/auth'}
            scroll={false}
            className="flex gap-4"
          >
            <Image src={ProfileIcon} width={24} height={24} alt="프로필" />
            마이페이지
          </Link>
        </div>

        <SheetFooter className="flex-row justify-end">
          {user && (
            <>
              <form action={signOut}>
                <button className="flex flex-row items-center gap-2 text-blue-primary focus:outline-none">
                  <Image
                    src={LogoutIcon}
                    width={20}
                    height={20}
                    alt="로그아웃"
                  />
                  로그아웃
                </button>
              </form>
            </>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
