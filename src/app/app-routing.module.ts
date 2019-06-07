import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ListComponent} from './list/list.component';
import {DoctorDetailComponent} from './doctor-detail/doctor-detail.component';
import {RequestAppointmentComponent} from './request-appointment/request-appointment.component';
import {SearchComponent} from './search/search.component';

const routes: Routes = [
  {path: 'home' , component: HomeComponent},
  {path: 'list' , component: ListComponent},
  {path: 'doctors/:id' , component: DoctorDetailComponent},
  {path: 'request' , component: RequestAppointmentComponent},
  {path: 'search' , component: SearchComponent},
  { path: '',  redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
