import { instance } from '../../shared/api/axiosInstance';

export async function fetchDoctors({ pageSize, pageIndex, name = null }) {
  const response = await instance.get('api/doctors', {
    params: { pageSize, pageIndex, name },
  });
  return { data: response.data.data, total: response.data.total };
}