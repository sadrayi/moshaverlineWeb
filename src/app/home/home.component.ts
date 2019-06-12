import {Component, OnInit} from '@angular/core';
import {NgSelectConfig} from '@ng-select/ng-select';
import {DataService} from '../shared/data.service';
import {CategoriesData} from '../models/responses/CategoriesModel';
import {Router} from '@angular/router';
import {LocalStorageService} from '../services/local-storage.service';
import {RequestAppointmentComponent} from '../request-appointment/request-appointment.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from '../login/login.component';
import {ProfileService} from '../services/profile-service';

interface Categories {
  id: number;
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profile: any;
  categoriesData: CategoriesData[] = [];
  categorieSelected: CategoriesData = null;
  categoriesLoading = false;
  doctorName = '';

  constructor(private modalService: NgbModal, private localStorageService: LocalStorageService, private dataService: DataService,
              private config: NgSelectConfig, private router: Router) {
    this.config.notFoundText = 'نتیجه ای یافت نشد.';
  }

  ngOnInit() {
    ProfileService.profileFunction = () => {
      console.log(ProfileService.profileData)
      console.log(ProfileService.profileData.code)
      if (ProfileService.profileData.code !== 200) {
        this.poshtiban = () => {
          this.modalService.open(LoginComponent);
        };
      } else {
        this.poshtiban = () => {
          const modal = this.modalService.open(RequestAppointmentComponent);
          modal.componentInstance.doctorName = 'انتخاب توسط پشتیبان';
          modal.componentInstance.doctorId = -1;
          modal.componentInstance.categoriesData = this.categoriesData;
        };
      }
    };
    this.loadCategories();
  }

  poshtiban() {
  }

  private search() {
    if (this.categorieSelected == null) {
      this.localStorageService.saveCategory('*');
    } else {
      this.localStorageService.saveCategory(this.categorieSelected._id.toString());
    }
    this.localStorageService.saveSearchedDoctorName(this.doctorName);
    this.router.navigate(['list']);
  }

  private loadCategories() {
    this.categoriesLoading = true;
    this.dataService.getCategories().subscribe(x => {
      this.categoriesData = x.data;
      this.categoriesLoading = false;
    });
  }
}
