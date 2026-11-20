import { instance } from '../../shared/api/axiosInstance';

export async function DeleteDoctor({ id }) {
  const response = await instance.delete(`api/doctors/${id}`);
  return { data: response.data };
}
