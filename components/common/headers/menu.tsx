import HamburgerIcon from '@/assets/svgs/hamburger-icon.svg';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Image from 'next/image';
import Profile from './profile';

export default async function Menu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src={HamburgerIcon}
          className="mr-4"
          width={30}
          height={30}
          alt="메뉴"
        />
      </SheetTrigger>
      <SheetContent side="right" className="">
        <Profile />
      </SheetContent>
    </Sheet>
  );
}
