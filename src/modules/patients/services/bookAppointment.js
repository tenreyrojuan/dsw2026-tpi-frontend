import { instance } from '../../shared/api/axiosInstance';

export async function bookAppointment({ doctorId, slotId, dni, reason }) {
  const response = await instance.post('api/appointments', {
    doctorId,
    availabilitySlotId: slotId,
    patient: { dni: String(dni) },
    reason,
  });

  return { appointment: response.data };
}