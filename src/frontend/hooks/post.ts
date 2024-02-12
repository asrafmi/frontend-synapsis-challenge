import { useQuery } from '@tanstack/react-query';
import { postSvc } from '../services/post';
import { Param } from '@/types/general';

const useAllPost = (param: Param) => {
  return useQuery({
    queryKey: ['post'],
    queryFn: () => postSvc.getAll(param),
  });
};

const useGetPostById = (id: number) => {
  return useQuery({
    queryKey: ['post'],
    queryFn: () => postSvc.getPostById(id),
  });
};

export { useAllPost, useGetPostById };
