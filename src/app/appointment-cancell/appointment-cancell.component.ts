import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../shared/data.service';

@Component({
  selector: 'app-appointment-cancell',
  templateUrl: './appointment-cancell.component.html',
  styleUrls: ['./appointment-cancell.component.css']
})
export class AppointmentCancellComponent implements OnInit {

  @Input() id: number;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
  }

  cancelRequest() {
    console.log('clicked');
    this.dataService.cancellAppointment(this.id).subscribe((x) => {
      if (x.code === 200) {
        window.location.reload();
      }
    });
  }
}
