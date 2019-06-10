import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.css']
})
export class UploadAvatarComponent implements OnInit {
  image: any;

  constructor() {
  }

  ngOnInit() {
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
      console.log(this.image);
    };
    myReader.readAsDataURL(file);
  }

}
