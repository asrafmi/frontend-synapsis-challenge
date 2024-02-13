import { backendRequest } from '@/infrastructure/backend-request';
import { Param } from '@/types/general';

class UsersService {
  getAll(param: Param) {
    const queryParam = new URLSearchParams({
      page: param.page,
      per_page: param.per_page,
    } as any);
    return backendRequest().get(`/public/v2/users?${queryParam}`);
  }

  getUserById(id: number) {
    return backendRequest().get(`/public/v2/users/${id}`);
  }

  deleteUserById(param: { id: number }) {
    return backendRequest().delete(`/public/v2/users/${param.id}`);
  }

  searchUser(param: { name: string }) {
    return backendRequest().get(`/public/v2/users?name=${param.name}`);
  }
}

export const userSvc = new UsersService();
