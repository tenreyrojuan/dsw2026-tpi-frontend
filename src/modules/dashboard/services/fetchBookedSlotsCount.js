import { instance } from '../../shared/api/axiosInstance';

export async function fetchBookedSlotsCount() {
  const response = await instance.get('api/slots', {
    params: { pageSize: 1, pageIndex: 1 },
  });
  return response.data.total;
}