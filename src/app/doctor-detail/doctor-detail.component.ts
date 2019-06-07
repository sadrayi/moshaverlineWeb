import {Component, OnInit} from '@angular/core';
import {doctorsData} from '../models/doctors-model';
import {DataService} from '../shared/data.service';
import {LocalStorageService} from '../services/local-storage.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {nazarsanjiData} from '../models/doctor-nazarsanji';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.css']
})
export class DoctorDetailComponent implements OnInit {

  doctorId: any;
  nazarsanjiPage: number = 1;
  doctorDetail: doctorsData;
  Nazarsanjies: nazarsanjiData[];

  constructor(private route: ActivatedRoute, private dataService: DataService, private localStorage: LocalStorageService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.doctorId = +params['id'];
    });
    console.log(this.doctorId);
    this.loadDoctorDetail();
    this.loadNazarsanji(this.nazarsanjiPage);
  }

  loadNazarsanji(page: number) {
    this.dataService.getDoctorNazarsanji(this.doctorId, page).subscribe((x) => {
      this.Nazarsanjies = x.data;
    });
  }

  loadDoctorDetail() {
    this.dataService.getDoctorDetail(this.doctorId).subscribe((x) => {
      this.doctorDetail = x;
    });
  }

}
