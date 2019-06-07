export class VerifyCode {
  phone: string;
  activecode: string;
  deviceid: string = null;
  type: string = 'user';
  constructor(phone:string,activecode:string){
    this.phone=phone;
    this.activecode=activecode;
  }
}
