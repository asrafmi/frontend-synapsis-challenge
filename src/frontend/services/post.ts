import { backendRequest } from "@/infrastructure/backend-request";

class PostsService {
  getAll() {
    return backendRequest().get(`/public/v2/posts`);
  }
}

export const postSvc = new PostsService();