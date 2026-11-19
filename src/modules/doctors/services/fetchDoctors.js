import { instance } from '../../shared/api/axiosInstance';

export async function fetchDoctors({ pageSize, pageIndex, name = null }) {
  try {
    const response = await instance.get('api/doctors', {
      params: {
        pageSize: pageSize,
        pageIndex: pageIndex,
        name: name,
      },
    });

    if (response.data.data.length === 0) {
      return { data: null, error: 'No se encontraron doctores' };
    }

    return { data: response.data, error: null };
  } catch (error) {
    if (response.status === 401) {
      return { data: null, error: 'Acceso no autorizado' };
    }

    if (response.status === 404) {
      return { data: null, error: 'Doctores no encontrados' };
    }

    if (response.status === 500) {
      return { data: null, error: 'Error interno del servidor' };
    }

    return { data: null, error: 'Error' };
  }
}
