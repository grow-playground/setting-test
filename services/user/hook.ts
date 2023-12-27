import { useSuspenseQuery } from '@tanstack/react-query';
import userOptions from './options';

export function useGetUserInfo(id: string) {
  return useSuspenseQuery(userOptions.info(id));
}
