import { instance } from '../../shared/api/axiosInstance';

export async function fetchDoctorsCount() {
  const response = await instance.get('api/doctors', {
    params: { pageSize: 1, pageIndex: 1 },
  });
  return response.data.total;
}