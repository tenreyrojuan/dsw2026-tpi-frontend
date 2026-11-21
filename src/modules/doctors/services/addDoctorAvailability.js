import { instance } from '../../shared/api/axiosInstance';
import { fetchDoctorAvailabilities } from './fetchDoctorAvailabilities';

export async function addDoctorAvailability({ doctorId, days }) {
  const { data: current } = await fetchDoctorAvailabilities(doctorId);
  const method = current.length > 0 ? 'put' : 'post';

  const response = await instance[method]('api/availabilities', {
    doctorId,
    days,
  });

  return { data: response.data };
}
