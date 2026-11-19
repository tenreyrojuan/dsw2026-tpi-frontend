import { instance } from "../../shared/api/axiosInstance";



export async function DeleteDoctor({id}) {

    try{
      console.log("Aqui llegue");
      const response = await instance.delete(`api/doctors/${id}`);
      return {error: null}
    }
    catch(error){
      if(response.status === 404){
        return {error : "No se ha encontrado al doctor"}
      }

    }
}