import { instance } from '../../shared/api/axiosInstance';

export async function fetchDoctorSlots({ doctorId, from, to }) {
  const response = await instance.get(`api/doctors/${doctorId}/slots`, {
    params: { from, to },
  });

  const slots = (response.data ?? []).map((slot) => ({
    id: slot.slotId,
    date: String(slot.date).slice(0, 10),
    time: String(slot.startTime).slice(0, 5),
  }));

  return { slots };
}