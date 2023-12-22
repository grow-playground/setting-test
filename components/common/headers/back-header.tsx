import Header from './header';
import Image from 'next/image';
import NavLink from '../link/nav-link';
import BackIcon from '@/assets/images/back-icon.png';
import Profile from './profile';

export default function BackHeader() {
  return (
    <>
      <Header
        leftArea={
          <NavLink href="/" scroll={false}>
            <Image
              src={BackIcon}
              width={30}
              height={30}
              className="ml-4"
              alt="뒤로 가기"
            />
          </NavLink>
        }
        centerArea={<h1 className="text-xl font-bold text-blue">TypeTime</h1>}
        rightArea={<Profile />}
      />
    </>
  );
}
