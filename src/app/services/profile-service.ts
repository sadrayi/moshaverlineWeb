import {Injectable} from '@angular/core';

@Injectable()
export class ProfileService {
  static profileData: any;
  static loaded = false;
  static profileFunction = () => {
  };

  constructor() {
  }

  static setProfile(profileData: any) {
    this.profileData = profileData;
    this.loaded = true;
    this.profileFunction();
  }

  static getProfile(): any {
    return this.profileData;
  }
}
