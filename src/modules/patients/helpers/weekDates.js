const DAYS = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];
const MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const pad = (n) => String(n).padStart(2, '0');

export function toIsoDate(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function addDays(date, amount) {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return result;
}

// Lunes de la semana actual (si es domingo, el lunes siguiente)
export function getMonday(today = new Date()) {
  const date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const day = date.getDay();
  return addDays(date, day === 0 ? 1 : 1 - day);
}

export function getWeekDays(monday) {
  return Array.from({ length: 6 }, (_, i) => {
    const date = addDays(monday, i);
    return {
      isoDate: toIsoDate(date),
      name: DAYS[date.getDay()],
      shortName: DAYS[date.getDay()].slice(0, 3).toUpperCase(),
      number: date.getDate(),
      month: MONTHS[date.getMonth()],
    };
  });
}

export function formatWeekLabel(days) {
  const first = days[0];
  const last = days[days.length - 1];
  const month =
    first.month === last.month ? first.month : `${first.month} - ${last.month}`;

  return `${first.name} ${first.number} - ${last.name} ${last.number}, ${month}`;
}

export function formatLongDate(isoDate) {
  const date = new Date(`${isoDate}T00:00:00`);
  return `${DAYS[date.getDay()]} ${date.getDate()} de ${MONTHS[date.getMonth()]} de ${date.getFullYear()}`;
}