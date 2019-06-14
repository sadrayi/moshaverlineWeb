import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CategoriesModel} from '../models/responses/CategoriesModel';
import {doctorsData, DoctorsModel} from '../models/responses/doctors-model';
import {DoctorsCountModel} from '../models/responses/doctors-count-model';
import {DoctorNazarsanji} from '../models/responses/doctor-nazarsanji';
import {DoctorCalendar} from '../models/responses/doctor-calendar';
import {GeneralResponse} from '../models/responses/general-response';
import {VerifyCode} from '../models/send/verify-code';
import {LocalStorageService} from '../services/local-storage.service';
import {AppointmentRequest} from '../models/send/appointment-request';

const ApiUrl = 'http://admin.moshaverline.com/webservice/';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'id': this.localstorage.getUserId().toString(),
      'type': 'user',
      'token': this.localstorage.getUserToken()
    })
  };

  constructor(private localstorage: LocalStorageService, private http: HttpClient) {
  }

  getCategories(): Observable<CategoriesModel> {
    return this.http.get<CategoriesModel>(ApiUrl + 'categories');
  }

  searchDoctors(doctorName: string, categoryId: string, page: number): Observable<DoctorsModel> {
    return this.http.get<DoctorsModel>(ApiUrl + 'doctorsSearch?page=' + page + '&categoryId=' + categoryId + '&doctorName=' + doctorName);
  }

  getAppointments(page: number): Observable<GeneralResponse> {
    return this.http.get<GeneralResponse>(ApiUrl + 'appointmentsWeb?page=' + page, this.httpOptions);
  }

  getAppointmentsCount(): Observable<any> {
    return this.http.get<any>(ApiUrl + 'appointmentsCount', this.httpOptions);
  }

  getDoctorDetail(doctorId: number): Observable<doctorsData> {
    return this.http.get<doctorsData>(ApiUrl + 'doctor?doctorId=' + doctorId);
  }

  getDoctorCalendar(doctorId: number): Observable<DoctorCalendar> {
    return this.http.get<DoctorCalendar>(ApiUrl + 'webcalendar?doctorId=' + doctorId);
  }

  getVeriyCode(phone: string): Observable<GeneralResponse> {
    return this.http.get<GeneralResponse>(ApiUrl + 'verifycode?type=user&&phone=' + phone);
  }

  cancellAppointment(id: number): Observable<GeneralResponse> {
    return this.http.delete<GeneralResponse>(ApiUrl + 'appointments?id=' + id, this.httpOptions);
  }

  getProfileDetail(): Observable<GeneralResponse> {
    return this.http.get<GeneralResponse>(ApiUrl + 'profile', this.httpOptions);
  }

  payAppoinment(id: number): Observable<GeneralResponse> {
    return this.http.get<GeneralResponse>(ApiUrl + 'factor_pay?appointment_id=' + id, this.httpOptions);
  }

  updateProfileName(name: string, codemeli: string, pic: string): Observable<GeneralResponse> {
    this.httpOptions.headers.set('id', this.localstorage.getUserId().toString());
    this.httpOptions.headers.set('token', this.localstorage.getUserToken());
    console.log(pic);
    console.log('token: ' + this.localstorage.getUserToken());
    return this.http.post<GeneralResponse>(ApiUrl + 'profileWeb', {name: name, codemeli: codemeli, pic: pic}, this.httpOptions);
  }

  sendAppointmentRequest(data: AppointmentRequest): Observable<GeneralResponse> {
    return this.http.post<GeneralResponse>(ApiUrl + 'appointments', data, this.httpOptions);
  }

  sendVerifyCode(data: VerifyCode): Observable<GeneralResponse> {
    return this.http.post<GeneralResponse>(ApiUrl + 'verifycode', data);
  }

  getDoctorNazarsanji(doctorId: number, page: number): Observable<DoctorNazarsanji> {
    return this.http.get<DoctorNazarsanji>(ApiUrl + 'nazarsanji?doctorId=' + doctorId + '&page=' + page);
  }

  searchDoctorsCount(doctorName: string, categoryId: string): Observable<DoctorsCountModel> {
    return this.http.get<DoctorsCountModel>(ApiUrl + 'doctorscount?categoryId=' + categoryId + '&doctorName=' + doctorName);
  }
}
