'use client';

import Image from 'next/image';
import BackIcon from '@/assets/images/back-icon.png';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button className="ml-4 flex items-center" onClick={() => router.back()}>
      <Image src={BackIcon} width={30} height={30} alt="뒤로 가기" />
    </button>
  );
}
