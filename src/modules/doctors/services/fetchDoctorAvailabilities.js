import { instance } from '../../shared/api/axiosInstance';

export async function fetchDoctorAvailabilities(doctorId) {
  const response = await instance.get(`api/doctors/${doctorId}/availabilities`);

  return { data: response.data };
}
