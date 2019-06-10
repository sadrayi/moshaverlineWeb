import {Component, OnInit} from '@angular/core';
import {DataService} from '../shared/data.service';
import {Router} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  name = 'ورود';
  loggedIn = false;

  constructor(private modalService: NgbModal, private dataservice: DataService, private router: Router) {
  }

  ngOnInit() {
    this.dataservice.getProfileDetail().subscribe((x) => {
      console.log(x);
      if (x.code === 200) {
        this.loggedIn = true;
        if (x.data.name !== '') {
          this.name = x.data.name;
        } else {
          this.modalService.open(LoginComponent);
        }

      }
    });
  }

  onHeaderClick() {
    if (this.loggedIn) {
      this.router.navigate(['profile']);
    } else {
      this.modalService.open(LoginComponent);
    }
  }

}
