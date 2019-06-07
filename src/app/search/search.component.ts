import { Component, OnInit} from '@angular/core';

interface Person {
  id: string;
  age: number;
  disabled?: boolean;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  public people2: Person[];

  constructor() {
  }

  ngOnInit() {
    this.people2 = [
      {age: 1, id: 'majid1', disabled: false},
      {age: 2, id: 'majid2', disabled: false},
      {age: 3, id: 'majid3', disabled: false},
      {age: 4, id: 'majid4', disabled: false},
    ];
  }


}
