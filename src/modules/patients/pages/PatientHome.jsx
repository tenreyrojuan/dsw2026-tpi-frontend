import { useNavigate } from 'react-router-dom';
import Card from '../../shared/components/Card';
import Loading from '../../shared/components/Loading';
import ErrorMessage from '../../shared/components/ErrorMessage';
import { useBookAppointment } from '../hooks/useBookAppointment';
import { useBookingOptions } from '../hooks/useBookingOptions';
import { useWeekSlots } from '../hooks/useWeekSlots';
import BookingFilters from '../components/BookingFilters';
import DoctorCard from '../components/DoctorCard';
import WeekHeader from '../components/WeekHeader';
import WeekGrid from '../components/WeekGrid';
import DayPicker from '../components/DayPicker';
import BookingSummary from '../components/BookingSummary';
import BookingConfirmedModal from '../components/BookingConfirmedModal';

function PatientHome() {
  const navigate = useNavigate();
  const form = useBookAppointment();
  const { specialties, doctors, error } = useBookingOptions(form.specialtyId);
  const week = useWeekSlots(form.doctorId, form.refreshKey, form.clearSlot);

  const doctor = doctors.find((d) => d.id === form.doctorId);
  const slot = week.findSlot(form.slotId);

  const slotsProps = {
    days: week.weekDays,
    slotsByDate: week.slotsByDate,
    selectedSlotId: form.slotId,
    onSelect: form.selectSlot,
  };

  return (
    <>
      <form
        onSubmit={form.handleSubmit(form.onSubmit)}
        noValidate
        className="max-w-5xl mx-auto"
      >
        <fieldset
          disabled={form.isSubmitting}
          className="flex flex-col gap-6 min-w-0"
        >
          <Card className="p-6 sm:p-7">
            <div className="mb-5">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-med-primary-900">
                Reservar Turno Médico
              </h1>
              <p className="text-xs sm:text-sm text-med-text-sub mt-1">
                Seleccione la especialidad y el profesional para continuar.
              </p>
            </div>
            <BookingFilters
              register={form.register}
              errors={form.errors}
              specialties={specialties}
              doctors={doctors}
              specialtyId={form.specialtyId}
              onSpecialtyChange={form.onSpecialtyChange}
              onDoctorChange={form.clearSlot}
              error={error}
            />
          </Card>

          {doctor && (
            <>
              <DoctorCard doctor={doctor} />

              <Card className="p-5 sm:p-6">
                <WeekHeader
                  label={week.weekLabel}
                  canGoPrev={week.canGoPrev}
                  onPrev={week.goPrev}
                  onNext={week.goNext}
                />
                {week.isLoading ? (
                  <Loading />
                ) : week.error ? (
                  <div className="pt-5">
                    <ErrorMessage message={week.error} />
                  </div>
                ) : (
                  <>
                    <WeekGrid {...slotsProps} />
                    <DayPicker {...slotsProps} />
                  </>
                )}
              </Card>

              <BookingSummary
                doctor={doctor}
                slot={slot}
                register={form.register}
                errors={form.errors}
                isSubmitting={form.isSubmitting}
                errorMessage={form.errorMessage}
              />
            </>
          )}
        </fieldset>
      </form>

      {form.appointment && (
        <BookingConfirmedModal
          appointment={form.appointment}
          doctor={doctor}
          onViewAppointments={() => navigate('/appointments')}
          onClose={form.closeAppointment}
        />
      )}
    </>
  );
}

export default PatientHome;