import { useNavigate } from "react-router-dom";
import { AddDoctor } from "../services/addDoctor";


export function useAddDoctor(){
  const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm();
  
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
          const { newDoctor, error } = await AddDoctor({
            name: data.name,
            licenseNumber: data.licenseNumber,
            specialtyId: data.specialtyId,
          });
          navigate(-1);
        } catch (error) {
          setError(error.message);
        }
    };

    return {register, handleSubmit, formState, errors, isSubmitting, onSubmit}
}