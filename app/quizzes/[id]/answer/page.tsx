import BackButton from '@/components/common/buttons/back-button';
import Header from '@/components/header';
import Link from 'next/link';
import UserProfile from '@/assets/images/user-profile.png';
import Image from 'next/image';

export default function Page() {
  return (
    <>
      <Header
        leftArea={<BackButton />}
        centerArea={
          <h1 className="text-xl font-bold text-blue-700">TypeTime</h1>
        }
        rightArea={
          <Link href="/">
            <Image src={UserProfile} width={50} height={50} alt="유저 프로필" />
          </Link>
        }
      />
      <div>{'수정 예정'}</div>
    </>
  );
}
