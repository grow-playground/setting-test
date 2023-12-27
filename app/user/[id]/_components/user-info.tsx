'use client';

import { useGetUserInfo } from '@/services/user/hook';

export default function UserInfo({ userId }: { userId: string }) {
  const { data: userInfo } = useGetUserInfo(userId);

  return userInfo && <h1 className="text-3xl font-bold">{userInfo.name}</h1>;
}
