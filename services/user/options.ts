import { queryOptions } from '@tanstack/react-query';
import userAPI from './api';

const userOptions = {
  default: ['users'] as const,

  info: (id: string) =>
    queryOptions({
      queryKey: [...userOptions.default, 'info', id],
      queryFn: () => userAPI.getUserInfo(id),
    }),
};

export default userOptions;
