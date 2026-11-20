import { instance } from "../../shared/api/axiosInstance";

export async function deleteSpecialty(id) {

    try{
      await instance.delete(`api/specialties/${id}`);
      return {error: null}
    } catch(error){
      if(error.response?.status === 404){
        return {error : "No se ha encontrado la especialidad"}
      }
      return {error: error.response?.data?.message || "Error al eliminar la especialidad"}
    }
}