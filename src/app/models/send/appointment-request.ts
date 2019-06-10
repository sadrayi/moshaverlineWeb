export class AppointmentRequest {
  doctor_id: string;
  category_id: string;
  startAt: number;
  comment: string;

  constructor(doctor_id: string, category_id: string, startAt: number, comment: string) {
    this.startAt = startAt;
    this.category_id = category_id;
    this.doctor_id = doctor_id;
    this.comment = comment;
  }
}
