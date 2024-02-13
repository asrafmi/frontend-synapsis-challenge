import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

const useDeleteUserById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userSvc.deleteUserById,
    onSuccess: () => {
      queryClient.invalidateQueries('user');
    },
    onError: (err) => {
      console.log('err', err);
    },
  });
};

const useSearchUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userSvc.searchUser,
    onSuccess: () => {
      queryClient.invalidateQueries('user');
    },
    onError: (err) => {
      console.log('err', err);
    },
  });
};

export { useAllUser, useGetUserById, useDeleteUserById, useSearchUser };
