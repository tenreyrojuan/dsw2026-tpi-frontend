import { instance } from '../../shared/api/axiosInstance';

export async function cancelAppointment({ id }) {
  const response = await instance.delete(`api/appointments/${id}`);

  return { data: response.data };
}
