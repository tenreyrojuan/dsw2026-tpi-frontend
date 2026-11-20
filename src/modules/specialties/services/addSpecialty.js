import { instance } from '../../shared/api/axiosInstance';

export async function addSpecialty({ name, description }) {
  const response = await instance.post('api/specialties', {
    name,
    description,
  });
  return { newSpecialty: response.data };
}