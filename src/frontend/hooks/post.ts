import { useQuery } from '@tanstack/react-query';
import { postSvc } from '../services/post';

const useAllPost = () => {
  return useQuery({
    queryKey: ['post'],
    queryFn: () => postSvc.getAll(),
  });
};

export { useAllPost };
