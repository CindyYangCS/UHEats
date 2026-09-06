import { DiningHours, DiningLocation } from '../types/dining';

interface OpenStatus {
  isOpen: boolean;
  todaysHours: DiningHours | undefined;
  openStatusLabel: string;
}

const timeStringToMinutes = (timeStr: string): number => {
  if (timeStr === 'CLOSED') return -1;
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (modifier === 'PM' && hours < 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;
  return hours * 60 + minutes;
};

export function getOpenStatus(diningLocation: DiningLocation): OpenStatus {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const todaysHours = diningLocation.hours.find((h) => h.dayOfWeek === dayOfWeek);

  let isOpen = false;
  if (todaysHours && todaysHours.openTime !== 'CLOSED') {
    const openMinutes = timeStringToMinutes(todaysHours.openTime);
    const closeMinutes = timeStringToMinutes(todaysHours.closeTime);
    isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;
  }

  const openStatusLabel = isOpen
    ? `Open · ${todaysHours!.openTime} - ${todaysHours!.closeTime}`
    : 'Closed';

  return { isOpen, todaysHours, openStatusLabel };
}