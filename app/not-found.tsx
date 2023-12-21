import BackButton from '@/components/common/buttons/back-button';
import Header from '@/components/header';
import Image from 'next/image';
import Link from 'next/link';
import TypeTime from '@/assets/images/type-time.png';

export default function NotFound() {
  return (
    <>
      <Header leftArea={<BackButton />} />
      <div className="mt-40 flex max-w-md flex-col items-center gap-4">
        <Image src={TypeTime} alt="로고" priority width={160} height={160} />
        <p className="text-lg">페이지를 찾을 수 없습니다.</p>
        <Link
          href="/"
          className="rounded bg-blue-600 px-4 py-2 text-2xl font-bold text-white"
        >
          홈으로 이동하기
        </Link>
      </div>
    </>
  );
}
