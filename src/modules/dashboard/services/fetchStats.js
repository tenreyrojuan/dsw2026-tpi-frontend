import { instance } from '../../shared/api/axiosInstance';

export async function fetchStats() {
  const response = await instance.get('api/stats');
  return response.data;
}