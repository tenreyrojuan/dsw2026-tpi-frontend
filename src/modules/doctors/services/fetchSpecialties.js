import { instance } from '../../shared/api/axiosInstance';

export async function fetchSpecialties() {
  const response = await instance.get('api/specialties', {
    params: {
      pageSize: 100,
      pageIndex: 0,
    },
  });

  return { data: response.data.data };
}