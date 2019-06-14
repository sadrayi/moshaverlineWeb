import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../shared/data.service';
import {Router} from '@angular/router';
import {UploadAvatarComponent} from '../upload-avatar/upload-avatar.component';
import {ProfileService} from '../services/profile-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  name: string;
  avatar: string;
  codemeli: string;

  constructor(private modalService: NgbModal, private dataservice: DataService, private router: Router) {
  }

  ngOnInit() {
    this.loadProfile();
  }

  updateProfile() {
    this.dataservice.updateProfileName(this.name, this.codemeli, null).subscribe((x) => {
      console.log(x);

    });
  }

  booking() {
    this.router.navigate(['booking']);
  }

  updateProfilePic() {
    const modal = this.modalService.open(UploadAvatarComponent);
  }

  loadProfile() {
    ProfileService.profileFunction = () => {
      if (ProfileService.profileData.code === 200) {
        this.name = ProfileService.profileData.data.name;
        this.avatar = ProfileService.profileData.data.profile_pic;
        this.codemeli = ProfileService.profileData.data.codemeli;
      } else {
        this.router.navigate(['home']);
      }
    };
  }
}
