import { useState } from 'react';
import SlotButton from './SlotButton';

function DayPicker({ days, slotsByDate, selectedSlotId, onSelect }) {
  const [pickedDate, setPickedDate] = useState(null);

  const activeDate = days.some((day) => day.isoDate === pickedDate)
    ? pickedDate
    : days[0].isoDate;
  const slots = slotsByDate[activeDate] ?? [];

  return (
    <div className="block sm:hidden pt-4 space-y-4">
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {days.map((day) => {
          const isActive = day.isoDate === activeDate;

          return (
            <button
              key={day.isoDate}
              type="button"
              onClick={() => setPickedDate(day.isoDate)}
              className={`flex-1 min-w-[68px] py-2.5 px-2 rounded-xl text-center border transition ${
                isActive
                  ? 'bg-med-primary-900 text-white border-med-primary-900'
                  : 'bg-white border-med-border text-med-text-main'
              }`}
            >
              <span className="block text-[10px] font-bold">{day.shortName}</span>
              <span className="block text-base font-extrabold">{day.number}</span>
              <span className="block text-[10px] uppercase">
                {day.month.slice(0, 3)}
              </span>
            </button>
          );
        })}
      </div>

      <div>
        <span className="block text-xs font-bold text-med-text-sub mb-2.5">
          Horarios disponibles (Bloques de 30 min)
        </span>

        {slots.length > 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {slots.map((slot) => (
              <SlotButton
                key={slot.id}
                time={slot.time}
                isSelected={slot.id === selectedSlotId}
                onClick={() => onSelect(slot.id)}
              />
            ))}
          </div>
        ) : (
          <p className="p-6 rounded-xl bg-gray-50 border border-med-border text-xs text-center text-med-text-muted">
            Sin disponibilidad
          </p>
        )}
      </div>
    </div>
  );
}

export default DayPicker;