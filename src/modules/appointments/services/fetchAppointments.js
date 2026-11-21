import { instance } from '../../shared/api/axiosInstance';

export async function fetchAppointments(params) {
  const response = await instance.get('api/appointments/search', { params });

  return { data: response.data.data, total: response.data.total };
}
