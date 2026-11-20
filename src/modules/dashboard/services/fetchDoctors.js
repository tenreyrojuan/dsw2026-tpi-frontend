import { instance } from '../../shared/api/axiosInstance';

export async function fetchDoctors() {
  const response = await instance.get('api/doctors', {
    params: { pageSize: 100, pageIndex: 1 },
  });
  return response.data.data;
}