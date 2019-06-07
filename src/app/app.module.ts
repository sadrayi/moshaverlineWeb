import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { DoctorDetailComponent } from './doctor-detail/doctor-detail.component';
import { RequestAppointmentComponent } from './request-appointment/request-appointment.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { HttpClientModule } from '@angular/common/http';
import {LocalStorageService} from './services/local-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    DoctorDetailComponent,
    RequestAppointmentComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    NgSelectModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
