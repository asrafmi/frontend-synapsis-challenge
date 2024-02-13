import { backendRequest } from '@/infrastructure/backend-request';
import { Param } from '@/types/general';
import { User } from '@/types/user';

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

  createUser(param: { body: Omit<User, 'id'> }) {
    return backendRequest().post(`/public/v2/users`, param.body);
  }

  updateUser(param: { id: number; body: Omit<User, 'id'> }) {
    return backendRequest().put(`/public/v2/users/${param.id}`, param.body);
  }
}

export const userSvc = new UsersService();
