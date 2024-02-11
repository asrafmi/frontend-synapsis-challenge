import { request } from './request';

export const backendRequest = () => {
  return request({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  });
};
