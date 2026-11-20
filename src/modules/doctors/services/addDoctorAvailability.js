

export async function addDoctorAvailability({doctorId, day, startTime, endTime}) {
  const response = await instance.post('/api/availabilities', {
    doctorId,
    days : {
      day,
      startTime,
      endTime
    }
  });
  return { response: response };
}
