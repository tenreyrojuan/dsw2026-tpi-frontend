import { instance } from '../../shared/api/axiosInstance';

export async function addDoctorAvailability({ doctorId, days }) {
  const response = await instance.post('api/availabilities', {
    doctorId,
    days,
  });

  return { data: response.data };
}
