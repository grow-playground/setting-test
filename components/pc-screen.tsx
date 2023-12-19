import Image from 'next/image';
import TypeTimeLogo from '@/assets/images/type-time-logo.png';

export function PcScreen() {
  return (
    <div id="pc-screen" className="flex flex-col">
      <div className="mb-20">
        <Image
          src={TypeTimeLogo}
          alt="타입타임 로고"
          width={158}
          height={63}
          priority
        />
      </div>

      <div className="flex flex-col gap-8">
        <p className="text-3xl font-bold text-slate-200">
          타입과 함께 시간을 더욱 가치있게
        </p>
        <p className="text-lg text-slate-200">
          타입스크립트의 세계로 초대합니다!
        </p>
      </div>
    </div>
  );
}
