import {Component, OnInit} from '@angular/core';
import {DataService} from '../shared/data.service';
import {LocalStorageService} from '../services/local-storage.service';
import {doctorsData} from '../models/responses/doctors-model';
import {CategoriesData} from '../models/responses/CategoriesModel';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public doctorName: string;
  public categoryId: string;
  public doctorsCount: number;
  public lastPage = 1;
  public pager: string[] = ['1'];
  public currentPage: number = 1;
  public doctors: doctorsData[];
  categoriesData: CategoriesData[] = [];
  categorieSelected: CategoriesData = null;
  categoriesLoading = false;
  private;

  constructor(private dataService: DataService, private localStorage: LocalStorageService) {
  }

  ngOnInit() {
    this.loadCategories();
    this.categoryId = this.localStorage.getCategorySelectedId();
    this.doctorName = this.localStorage.getdoctorSearchName();
    this.loadDoctors(this.currentPage);
  }

  loadCategories() {
    this.categoriesLoading = true;
    this.dataService.getCategories().subscribe(x => {
      this.categoriesData = x.data;
      this.categoriesLoading = false;
    });
  }

  private loadDoctors(page: number) {
    this.dataService.searchDoctorsCount(this.doctorName, this.categoryId).subscribe(x => {
      this.doctorsCount = x.count;

      this.lastPage = Math.ceil(this.doctorsCount / 12);
    });
    this.dataService.searchDoctors(this.doctorName, this.categoryId, page).subscribe(x => {
      this.doctors = x.data;
      console.log(x.data[0].star);
    });
  }

  private filter() {
    console.log(this.categorieSelected);
    if (this.categorieSelected == null) {
      this.localStorage.saveCategory('*');
      this.categoryId = '*';
    } else {
      this.localStorage.saveCategory(this.categorieSelected._id.toString());
      this.categoryId = this.categorieSelected._id.toString();
    }
    this.localStorage.saveSearchedDoctorName(this.doctorName);
    this.loadDoctors(this.currentPage);
  }

}
