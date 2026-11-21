import { instance } from '../../shared/api/axiosInstance';

export async function fetchAppointments(params) {
  const response = await instance.get('api/appointments/search', { params });

  const data = response.data.data.map((appointment) => ({
    id: appointment.appointmentsId,
    status: appointment.appointmentsStatus,
    date: appointment.date,
    time: String(appointment.startingTime).slice(0, 5),
    patient: appointment.patient.fullName,
    doctor: appointment.doctor.name,
    department: appointment.doctor.specialty.name,
  }));

  return { data, total: response.data.total };
}
