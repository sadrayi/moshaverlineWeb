import {Component, OnInit} from '@angular/core';
import {DataService} from '../shared/data.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AppointmentCancellComponent} from '../appointment-cancell/appointment-cancell.component';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  state = false;
  page = 1;
  pageCount = 1;
  appointments: any;

  constructor(private modalService: NgbModal, private dataService: DataService) {
  }

  ngOnInit() {
    this.loadAppointments(1);
    this.getAppointmentsCount();
  }

  unitToJalaliDate(unix: number): string {
    return Intl.DateTimeFormat('fa').format(new Date(unix));
  }

  unitToJalaliHour(unix: number): string {
    return Intl.DateTimeFormat('fa', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(unix));
  }

  cancelState(state: string): boolean {
    return 'منتظر پرداخت' === state || 'منتظر انجام' === state;
  }

  loadAppointments(page: number) {
    this.page = page;
    this.dataService.getAppointments(this.page).subscribe((x) => {
      console.log(x);
      this.appointments = x.data;
    });
  }

  payAppoinment(id: number) {
    window.location.href = 'http://admin.moshaverline.com/webservice/factor_pay?appointment_id=' + id;
  }

  cancellAppointment(id: number) {
    let cancelModal = this.modalService.open(AppointmentCancellComponent);
    cancelModal.componentInstance.id = id;
  }

  getAppointmentsCount() {
    this.dataService.getAppointmentsCount().subscribe((x) => {
      this.pageCount = Math.ceil(x.count / 12);
    });
  }

}
