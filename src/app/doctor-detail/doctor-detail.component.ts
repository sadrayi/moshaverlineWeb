import {Component, OnInit} from '@angular/core';
import {doctorsData} from '../models/responses/doctors-model';
import {DataService} from '../shared/data.service';
import {LocalStorageService} from '../services/local-storage.service';
import {ActivatedRoute} from '@angular/router';
import {nazarsanjiData} from '../models/responses/doctor-nazarsanji';
import {calendarsData} from '../models/responses/doctor-calendar';
import * as moment from 'moment-jalaali';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from '../login/login.component';
import {RequestAppointmentComponent} from '../request-appointment/request-appointment.component';
import {ProfileService} from '../services/profile-service';

interface calendar {
  date: Date;
  data: calendarsData[]
}

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.css']
})

export class DoctorDetailComponent implements OnInit {
  loggedIn: boolean = false;
  doctorId: any;
  nazarsanjiPage: number = 1;
  doctorDetail: doctorsData;
  Nazarsanjies: nazarsanjiData[];
  calendarData: calendar[] = [];

  constructor(private modalService: NgbModal, private route: ActivatedRoute, private dataService: DataService,
              private localStorage: LocalStorageService) {
  }

  ngOnInit() {
    ProfileService.profileFunction = () => {
      if (ProfileService.profileData.code === 200 && ProfileService.profileData.data.name !== '') {
        this.loggedIn = true;
      }
    };
    this.route.params.subscribe(params => {
      this.doctorId = + params.id;
    });
    console.log(this.doctorId);
    this.loadDoctorDetail();
    this.loadNazarsanji(this.nazarsanjiPage);
    this.loadDoctorCalendar();
  }

  open() {
    if (!this.loggedIn)
      this.modalService.open(LoginComponent);
    else {
      const modal = this.modalService.open(RequestAppointmentComponent);
      modal.componentInstance.doctorName = this.doctorDetail.name;
      modal.componentInstance.doctorId = this.doctorDetail._id;
    }

  }

  loadNazarsanji(page: number) {
    this.dataService.getDoctorNazarsanji(this.doctorId, page).subscribe((x) => {
      this.Nazarsanjies = x.data;
    });
  }

  loadDoctorCalendar() {
    this.dataService.getDoctorCalendar(this.doctorId).subscribe((x) => {
      var sortedDoctors = x.data.doctor_calendar.sort((a, b) => {
        return a.startAt == b.startAt ? 0 : +(a.startAt > b.startAt) || -1;
      });
      let startTime = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
      let minimumTime = new Date(new Date().setHours(23, 59, 59, 0)).getTime() + 518400000;
      let lasttime = 0;
      if (sortedDoctors.length > 0) {
        lasttime = new Date(sortedDoctors[sortedDoctors.length - 1].startAt).setHours(23, 59, 59, 59);
      }
      for (startTime; startTime < lasttime || startTime < minimumTime; startTime += 86400000) {
        let endTime = new Date(startTime).setHours(23, 59, 59, 59);
        this.calendarData.push({
          date: new Date(startTime),
          data: sortedDoctors.filter(o => {
            return o.startAt >= startTime && o.endAt <= endTime;
          })
        });
      }
      console.log(this.calendarData);
    });
  }

  DateToJalaliDay(row: number) {
    return moment(this.calendarData[row].date).locale('fa').format('dddd jYYYY/jMM/jDD');
  }

  DateToJalaliHours(row: number) {
    if (this.calendarData[row].data.length > 0) {
      return moment(this.calendarData[row].data[0].startAt).format('HH:mm') + ' - ' + moment(this.calendarData[row].data[this.calendarData[row].data.length - 1].endAt).format('HH:mm');
    } else
      return 'تعطیل';
  }

  loadDoctorDetail() {
    this.dataService.getDoctorDetail(this.doctorId).subscribe((x) => {
      this.doctorDetail = x;
    });
  }

}
