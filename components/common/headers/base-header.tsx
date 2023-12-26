import Header from './header';
import Image from 'next/image';
import TypeTimeLogo from '@/assets/images/type-time-logo.png';
import Profile from './profile';

export default function BaseHeader() {
  return (
    <Header
      leftArea={
        <Image
          src={TypeTimeLogo}
          alt="타입타임 로고"
          width={158}
          height={63}
          priority
        />
      }
      rightArea={<Profile />}
    />
  );
}
