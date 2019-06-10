import {Component, Input, OnInit} from '@angular/core';
import {CategoriesData} from '../models/responses/CategoriesModel';
import {DataService} from '../shared/data.service';
import {AppointmentRequest} from '../models/send/appointment-request';
import * as moment from 'jalali-moment';

@Component({
  selector: 'app-request-appointment',
  templateUrl: './request-appointment.component.html',
  styleUrls: ['./request-appointment.component.css']
})
export class RequestAppointmentComponent implements OnInit {
  @Input() categoriesData: CategoriesData[] = [];
  dateObject: any;
  categorieSelected: CategoriesData = null;
  categoriesLoading = false;
  @Input() doctorName: string;
  @Input() doctorId: number;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dateObject = moment(moment().format('jYYYY,jMM,jDD'), 'jYYYY,jMM,jDD');
  }

  saveRequest() {
    const appointment = new AppointmentRequest(this.doctorId.toString(), this.categorieSelected._id.toString(), this.dateObject.unix(), '');
    console.log(this.dateObject.unix());
    console.log(this.categorieSelected);
    this.dataService.sendAppointmentRequest(appointment).subscribe((x) => {
      console.log(x);
    });
  }

}
