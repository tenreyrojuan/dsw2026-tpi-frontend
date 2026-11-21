import SlotButton from './SlotButton';

function WeekGrid({ days, slotsByDate, selectedSlotId, onSelect }) {
  return (
    <div className="hidden sm:grid sm:grid-cols-5 gap-3 pt-5">
      {days.map((day) => {
        const slots = slotsByDate[day.isoDate] ?? [];

        return (
          <div key={day.isoDate} className="flex flex-col items-center gap-3">
            <div className="text-center">
              <span className="text-[11px] font-bold text-med-text-sub">
                {day.shortName}
              </span>
              <p className="text-xl font-bold text-med-primary-900 leading-tight">
                {day.number}
              </p>
            </div>

            <div className="w-full flex flex-col gap-2">
              {slots.length > 0 ? (
                slots.map((slot) => (
                  <SlotButton
                    key={slot.id}
                    time={slot.time}
                    isSelected={slot.id === selectedSlotId}
                    onClick={() => onSelect(slot.id)}
                  />
                ))
              ) : (
                <p className="py-10 text-xs text-center text-med-text-muted">
                  Sin disponibilidad
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default WeekGrid;