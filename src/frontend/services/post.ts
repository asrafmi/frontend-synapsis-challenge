import { backendRequest } from '@/infrastructure/backend-request';
import { Param } from '@/types/general';

class PostsService {
  getAll(param: Param) {
    const queryParam = new URLSearchParams({
      page: param.page,
      per_page: param.per_page,
    } as any);
    return backendRequest().get(`/public/v2/posts?${queryParam}`);
  }

  getPostById(id: number) {
    return backendRequest().get(`/public/v2/posts/${id}`);
  }
}

export const postSvc = new PostsService();
