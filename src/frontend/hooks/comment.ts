import { useQuery } from '@tanstack/react-query';
import { commentSvc } from '../services/comment';

const useGetCommentByPostId = (id: number) => {
  return useQuery({
    queryKey: ['comment'],
    queryFn: () => commentSvc.getCommentByPostId(id),
    enabled: !!id,
  });
};

export { useGetCommentByPostId };
