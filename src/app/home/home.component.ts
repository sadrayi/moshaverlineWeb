import {Component, OnInit} from '@angular/core';
import {NgSelectConfig} from '@ng-select/ng-select';
import {DataService} from '../shared/data.service';
import {CategoriesData, CategoriesModel} from '../models/CategoriesModel';
import {Router} from '@angular/router';
import {LocalStorageService} from '../services/local-storage.service';

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

  categoriesData: CategoriesData[] = [];
  categorieSelected: CategoriesData = null;
  categoriesLoading = false;
  doctorName: string = '';

  constructor(private localStorageService: LocalStorageService, private dataService: DataService, private config: NgSelectConfig, private router: Router) {
    this.config.notFoundText = 'نتیجه ای یافت نشد.';
  }

  ngOnInit() {
    this.loadCategories();
  }

  private search() {
    if (this.categorieSelected == null)
      this.localStorageService.saveCategory("*");
    else
      this.localStorageService.saveCategory(this.categorieSelected._id.toString());
    this.localStorageService.saveSearchedDoctorName(this.doctorName);
    this.router.navigate(['list'])
  }

  private loadCategories() {
    this.categoriesLoading = true;
    this.dataService.getCategories().subscribe(x => {
      this.categoriesData = x.data;
      this.categoriesLoading = false;
    });
  }
}
