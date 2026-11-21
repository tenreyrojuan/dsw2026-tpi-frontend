import { instance } from '../../shared/api/axiosInstance';

export async function fetchPatientAppointments({ dni }) {
  const response = await instance.get('api/appointments/patient', {
    params: { dni },
  });

  return response.data;
}
