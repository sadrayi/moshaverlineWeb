import {Component, OnInit} from '@angular/core';
import {DataService} from '../shared/data.service';
import {LocalStorageService} from '../services/local-storage.service';
import {VerifyCode} from '../models/send/verify-code';
import {ProfileService} from '../services/profile-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  phoneState = true;
  errorMessage = '';
  codeState = false;
  inputState = true;
  inputText = 'شماره همراه';
  headerText = 'شماره همراه خود را وارد نمایید.';
  phone: string;
  activeCode: string;
  input = '';

  constructor(private dataService: DataService, private localStorage: LocalStorageService) {
  }

  ngOnInit() {
    ProfileService.profileFunction = () => {
      if (ProfileService.profileData.code === 200) {
        this.errorMessage = '';
        if (ProfileService.profileData.data.name === '') {
          this.phoneState = false;
          this.headerText = 'لطفا اطلاعات کاربری خود را کامل نمایید.';
          this.inputText = 'نام و نام خانوادگی';
        }
      } else {
        this.errorMessage = ProfileService.profileData.message;
      }
    };
    if (ProfileService.loaded) {
      ProfileService.profileFunction();
    }
  }

  login() {
    if (this.inputState) {
      console.log(this.input);
      if (this.phoneState) {
        this.phoneState = false;
        this.inputState = false;
        this.phone = this.input;
        this.input = '';
        this.dataService.getVeriyCode(this.phone).subscribe((x => {
          if (x.code === 200) {
            this.errorMessage = '';
            this.inputState = true;
            this.codeState = true;
            this.inputText = 'کد تایید';
            this.headerText = 'کد تایید ارسال شده به شماره ' + this.phone + ' را وارد نمایید.';
          } else {
            this.errorMessage = x.message;
            this.phoneState = true;
            this.inputState = true;
          }
        }));
      } else if (this.codeState) {
        this.activeCode = this.input;
        this.input = '';
        this.dataService.sendVerifyCode(new VerifyCode(this.phone, this.activeCode)).subscribe((x) => {
          console.log(x);
          if (x.code === 200) {
            this.errorMessage = '';
            this.localStorage.saveUserId(x.data.id);
            this.localStorage.saveUserToken(x.data.token);
            if (x.data.name !== '') {
              window.location.reload();
            } else {
              this.codeState = false;
              this.headerText = 'لطفا اطلاعات کاربری خود را کامل نمایید.';
              this.inputText = 'نام و نام خانوادگی';
            }
          }else {
            this.errorMessage = x.message;
          }
        });
      } else {
        this.inputState = false;
        this.dataService.updateProfileName(this.input, '', null).subscribe((x) => {
          console.log(x);
          if (x.code === 200) {
            this.errorMessage = '';
            window.location.reload();
          } else {
            this.errorMessage = x.message;
            this.inputState = true;
          }
        });
      }
    }
  }
}
