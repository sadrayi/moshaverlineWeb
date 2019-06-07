import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../shared/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private modalService: NgbModal, private dataservice: DataService, private router: Router) {
  }

  name: string;
  avatar: string;
  codemeli: string;

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.dataservice.getProfileDetail().subscribe((x) => {
      console.log(x);
      if (x.code == 200) {
        this.name = x.data.name;
        this.avatar = x.data.profile_pic;
        this.codemeli = x.data.codemeli;
      } else {
        this.router.navigate(['home']);
      }
    });
  }
}
