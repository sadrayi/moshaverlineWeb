import {Injectable} from '@angular/core';

@Injectable()
export class ProfileService {
  static profileData: any;
  static profileFunction: any;

  constructor() {
  }

  static setProfile(profileData: any) {
    this.profileData = profileData;
    this.profileFunction();
  }

  static getProfile(): any {
    return this.profileData;
  }
}
