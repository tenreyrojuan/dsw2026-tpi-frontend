import { instance } from '../../shared/api/axiosInstance';

export async function fetchSpecialtiesCount() {
  const response = await instance.get('api/specialties', {
    params: { pageSize: 1, pageIndex: 1 },
  });
  return response.data.total;
}