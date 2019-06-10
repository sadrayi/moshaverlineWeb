import {Component, OnInit} from '@angular/core';
import {DataService} from '../shared/data.service';
import {LocalStorageService} from '../services/local-storage.service';
import {VerifyCode} from '../models/send/verify-code';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  phoneState = true;
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
    this.dataService.getProfileDetail().subscribe((x) => {
      console.log(x);
      if (x.code === 200) {
        if (x.data.name === '') {
          this.phoneState = false;
          this.headerText = 'لطفا اطلاعات کاربری خود را کامل نمایید.';
          this.inputText = 'نام و نام خانوادگی';
        }
      }
    });
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
            this.inputState = true;
            this.codeState = true;
            this.inputText = 'کد تایید';
            this.headerText = 'کد تایید ارسال شده به شماره ' + this.phone + ' را وارد نمایید.';
          } else {
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
            this.localStorage.saveUserId(x.data.id);
            this.localStorage.saveUserToken(x.data.token);
            if (x.data.name !== '') {
              window.location.reload();
            } else {
              this.codeState = false;
              this.headerText = 'لطفا اطلاعات کاربری خود را کامل نمایید.';
              this.inputText = 'نام و نام خانوادگی';
            }
          }
        });
      } else {
        this.inputState = false;
        this.dataService.updateProfileName(this.input, '', null).subscribe((x) => {
          console.log(x);
          if (x.code === 200) {
            window.location.reload();
          } else {
            this.inputState = true;
          }
        });
      }
    }
  }
}
