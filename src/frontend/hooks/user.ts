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
      queryClient.invalidateQueries('user' as any);
    },
    onError: (err) => {
      console.log('err', err);
    },
  });
};

const useSearchUser = (name: string) => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => userSvc.searchUser(name),
  });
};

const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userSvc.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries('user' as any);
    },
    onError: (err) => {
      console.log('err', err);
    },
  });
};

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userSvc.updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries('user' as any);
    },
    onError: (err) => {
      console.log('err', err);
    },
  });
};

export {
  useAllUser,
  useGetUserById,
  useDeleteUserById,
  useSearchUser,
  useCreateUser,
  useUpdateUser,
};
