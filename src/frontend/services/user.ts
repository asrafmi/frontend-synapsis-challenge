import { backendRequest } from '@/infrastructure/backend-request';
import { Param } from '@/types/general';

class UsersService {
  getAll(param: Param) {
    const queryParam = new URLSearchParams({
      page: param.page,
      per_page: param.per_page,
    }).toString();
    return backendRequest().get(`/public/v2/users?${queryParam}`);
  }

  getUserById(id: number) {
    return backendRequest().get(`/public/v2/users/${id}`);
  }
}

export const userSvc = new UsersService();
