import { instance } from '../../shared/api/axiosInstance';

export async function deleteSpecialty({ id }) {
  const response = await instance.delete(`api/specialties/${id}`);
  return {data: response.data};
}