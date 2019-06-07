import {Component, OnInit} from '@angular/core';
import {DataService} from '../shared/data.service';
import {LocalStorageService} from '../services/local-storage.service';
import {doctorsData, DoctorsModel} from '../models/responses/doctors-model';
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
  public lastPage: number;
  public pager: string[] = ['1'];
  public currentPage: number = 1;
  public doctors: doctorsData[];
  categoriesData: CategoriesData[] = [];
  categorieSelected: CategoriesData = null;
  categoriesLoading = false;

  constructor(private dataService: DataService, private localStorage: LocalStorageService) {
  }

  ngOnInit() {
    this.loadCategories();
    this.categoryId = this.localStorage.getCategorySelectedId();
    this.doctorName = this.localStorage.getdoctorSearchName();
    this.loadDoctors(this.currentPage);
  }

  private loadDoctors(page: number) {
    this.getPages();
    this.dataService.searchDoctors(this.doctorName, this.categoryId, page).subscribe(x => {
      this.doctors = x.data;
      console.log(x.data[0].star);
    });
  }

  private getPages() {
    this.dataService.searchDoctorsCount(this.doctorName, this.categoryId).subscribe(x => {
      this.doctorsCount = x.count;
      this.lastPage = Math.ceil(this.doctorsCount / 12);
      this.refreshPager();
    });
  }

  private nextpage(page: string) {
    let startpage = 0;
    if (typeof parseInt(page) === 'number' && !isNaN(parseInt(page))) {
      this.currentPage = parseInt(page);
    } else {
      if (page === '...') {
        this.currentPage = parseInt(this.pager[this.pager.length - 2]) + 1;
      } else if (page === '..') {
        this.currentPage = parseInt(this.pager[1]) - 1;
      }
    }
    this.refreshPager();
    this.loadDoctors(this.currentPage);
  }

  refreshPager() {
    let startpage = 0;
    if (this.pager.length > 1) {
      if (this.currentPage > parseInt(this.pager[this.pager.length - 2]))
        startpage = this.currentPage - 6;
      else if (this.currentPage < parseInt(this.pager[1]))
        startpage = this.currentPage;
    } else {
      startpage = 1;
    }
    if (startpage != 0) {
      this.pager = [];
      if (startpage != 1)
        this.pager.push('..');
      for (let i = startpage; i <= this.lastPage && i < 7 + startpage; i++) {
        this.pager.push(i.toString());
      }
      if (parseInt(this.pager[this.pager.length - 1]) - this.lastPage != 0) {
        this.pager.push('...');
      }
    }

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

  private;

  loadCategories() {
    this.categoriesLoading = true;
    this.dataService.getCategories().subscribe(x => {
      this.categoriesData = x.data;
      this.categoriesLoading = false;
    });
  }

}
