import { instance } from '../../shared/api/axiosInstance';

export async function AddDoctor({ name, licenseNumber, specialtyId }) {
  const response = await instance.post('api/doctors', {
    name,
    licenseNumber,
    specialtyId,
  });
  return { newDoctor: response.data };
}
