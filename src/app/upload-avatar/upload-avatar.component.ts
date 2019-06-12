import {Component, OnInit, Output} from '@angular/core';
import {DataService} from '../shared/data.service';

@Component({
  selector: 'app-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.css']
})
export class UploadAvatarComponent implements OnInit {
  image: any;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  UpdateAvatar() {
    this.dataService.updateProfileName(null, null, this.image).subscribe((x) => {
      if (x.code === 200) {
        window.location.reload();
      }
    });
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
    };
    myReader.readAsDataURL(file);
  }

}
