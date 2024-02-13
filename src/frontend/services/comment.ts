import { backendRequest } from '@/infrastructure/backend-request';

class CommentsService {
  getCommentByPostId(id: number) {
    return backendRequest().get(`/public/v2/comments?post_id=${id}`);
  }
}

export const commentSvc = new CommentsService();
