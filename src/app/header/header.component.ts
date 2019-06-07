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
  name: string = 'ورود';
  loggedIn: boolean = false;

  constructor(private modalService: NgbModal, private dataservice: DataService, private router: Router) {
  }

  ngOnInit() {
    this.dataservice.getProfileDetail().subscribe((x) => {
      console.log(x);
      if (x.code == 200) {
        this.loggedIn = true;
        this.name = x.data.name;
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
