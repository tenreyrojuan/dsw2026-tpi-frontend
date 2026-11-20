import { instance } from '../../shared/api/axiosInstance';

export async function fetchSpecialties({ name = '' } = {}) {
  try {
    const response = await instance.get('api/specialties', {
      params: {
        pageSize: 100,
        pageIndex: 1,
        ...(name ? { name } : {}),
      },
    });

    const list = Array.isArray(response.data)
      ? response.data
      : response.data?.data ?? [];

    return {
      data: list,
      total: response.data?.total ?? list.length,
      error: null,
    };
  } catch (error) {
    const status = error.response?.status;
    if (status === 401) return { data: [], total: 0, error: 'Acceso no autorizado' };
    if (status === 404) return { data: [], total: 0, error: 'Especialidades no encontradas' };
    if (status === 500) return { data: [], total: 0, error: 'Error interno del servidor' };

    return {
      data: [],
      total: 0,
      error: error.response?.data?.message || 'Error al cargar especialidades',
    };
  }
}