import { instance } from '../../shared/api/axiosInstance';

export async function fetchDoctors({ pageSize, pageIndex, name = null }) {
  const response = await instance.get('api/doctors', {
    params: {
      pageSize: pageSize,
      pageIndex: pageIndex,
      name: name,
    },
  });

  return { filteredDoctors: response.data.data, total: response.data.total }
}
