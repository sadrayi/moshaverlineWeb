import {Component, Input, OnInit} from '@angular/core';
import {CategoriesData} from '../models/responses/CategoriesModel';
import {DataService} from '../shared/data.service';
import {AppointmentRequest} from '../models/send/appointment-request';
import * as moment from 'jalali-moment';
import {Router} from '@angular/router';

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

  constructor(private dataService: DataService, private router: Router) {
  }

  ngOnInit() {
    this.dateObject = moment(moment().format('jYYYY,jMM,jDD'), 'jYYYY,jMM,jDD');
    if (this.categoriesData.length === 0) {
      this.loadCategories();
    }
  }

  saveRequest() {
    const appointment = new AppointmentRequest(this.doctorId.toString(), this.categorieSelected._id.toString(), this.dateObject.unix() * 1000, '');
    console.log(appointment);
    this.dataService.sendAppointmentRequest(appointment).subscribe((x) => {
      console.log(x);
      if (x.code == 200) {
        if (this.doctorId != -1) {
          window.location.href = 'http://admin.moshaverline.com/webservice/factor_pay?appointment_id=' + x.data;
        } else {
          this.router.navigate(['booking']);
        }
      }
    });
  }

  private loadCategories() {
    this.categoriesLoading = true;
    this.dataService.getCategories().subscribe(x => {
      this.categoriesData = x.data;
      this.categoriesLoading = false;
    });
  }

}
