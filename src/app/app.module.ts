import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './home/home.component';
import {ListComponent} from './list/list.component';
import {DoctorDetailComponent} from './doctor-detail/doctor-detail.component';
import {RequestAppointmentComponent} from './request-appointment/request-appointment.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {SearchComponent} from './search/search.component';
import {HttpClientModule} from '@angular/common/http';
import {LocalStorageService} from './services/local-storage.service';
import {LoginComponent} from './login/login.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProfileComponent} from './profile/profile.component';
import {DpDatePickerModule} from 'ng2-jalali-date-picker';
import {UploadAvatarComponent} from './upload-avatar/upload-avatar.component';
import {RouterModule} from '@angular/router';
import {ProfileService} from './services/profile-service';
import {SideBarComponent} from './side-bar/side-bar.component';
import {BookingComponent} from './booking/booking.component';
import {CurrencyFormaterPipe} from './pipes/currency-formater.pipe';
import {AppointmentStatePipe} from './pipes/appointment-state.pipe';
import {PagingComponent} from './paging/paging.component';
import {AppointmentCancellComponent} from './appointment-cancell/appointment-cancell.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    DoctorDetailComponent,
    RequestAppointmentComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    LoginComponent,
    ProfileComponent,
    UploadAvatarComponent,
    SideBarComponent,
    BookingComponent,
    CurrencyFormaterPipe,
    AppointmentStatePipe,
    PagingComponent,
    AppointmentCancellComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule,
    DpDatePickerModule,
    NgSelectModule,
    FormsModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [LocalStorageService, ProfileService],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, UploadAvatarComponent, AppointmentCancellComponent]
})
export class AppModule {
}
