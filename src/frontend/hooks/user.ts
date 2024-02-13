import { useQuery } from '@tanstack/react-query';
import { Param } from '@/types/general';
import { userSvc } from '../services/user';

const useAllUser = (param: Param) => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => userSvc.getAll(param),
  });
};

const useGetUserById = (id: number) => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => userSvc.getUserById(id),
    enabled: !!id,
  });
};

export { useAllUser, useGetUserById };
