import {Component, OnInit} from '@angular/core';
import {DataService} from '../shared/data.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  state = false;
  page = 1;
  pageCount = 12;
  appointments: any;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.loadAppointments();
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

  loadAppointments() {
    console.log();
    this.dataService.getAppointments(this.page).subscribe((x) => {
      this.appointments = x.data;
      console.log(x.data);
    });
  }

  getAppointmentsCount() {
    this.dataService.getAppointmentsCount().subscribe((x) => {
      //this.pageCount=Math.ceil(x.count/12);
    });
  }

}
