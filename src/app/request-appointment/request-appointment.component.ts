import {Component, Input, OnInit} from '@angular/core';
import {CategoriesData} from '../models/responses/CategoriesModel';
import {DataService} from '../shared/data.service';

@Component({
  selector: 'app-request-appointment',
  templateUrl: './request-appointment.component.html',
  styleUrls: ['./request-appointment.component.css']
})
export class RequestAppointmentComponent implements OnInit {
  categoriesData: CategoriesData[] = [];
  categorieSelected: CategoriesData = null;
  categoriesLoading = false;
  @Input() doctorName: string;
  @Input() doctorId: number;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.loadCategories();
  }

  private loadCategories() {
    this.categoriesLoading = true;
    this.dataService.getCategories().subscribe(x => {
      this.categoriesData = x.data;
      this.categoriesLoading = false;
    });
  }
}
