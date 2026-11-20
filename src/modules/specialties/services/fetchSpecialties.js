import { instance } from '../../shared/api/axiosInstance';

export async function fetchSpecialties({ pageSize, pageIndex, name = null }) {
  const response = await instance.get('api/specialties', {
    params: { pageSize, pageIndex, name },
  });

  return { data: response.data, error: null };
}