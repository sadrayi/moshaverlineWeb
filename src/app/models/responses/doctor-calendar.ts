export interface appointmentsData {
  startAt: number;
  endAt: number;
  name: string;
  id: number;
}

export interface calendarsData {
  startAt: number;
  endAt: number;
  id: number;
}

export class DoctorCalendar {
  code: number;
  message: string;
  data: { appointments_calendar: appointmentsData[], doctor_calendar: calendarsData[] };
}
