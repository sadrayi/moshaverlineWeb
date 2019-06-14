import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit {

  @Output() pageChanged = new EventEmitter<number>();
  lastPage: number;
  private pager: string[] = ['1'];
  private currentPage = 1;

  constructor() {
  }

  @Input()
  public get setPage(): number {
    return this.lastPage;
  }

  public set setPage(lastPage: number) {
    this.lastPage = lastPage > 0 ? lastPage : 1;

    this.refreshPager();
  }

  ngOnInit() {
    this.refreshPager();
  }

  refreshPager() {

    console.log(this.lastPage);
    let startpage = 0;
    if (this.pager.length > 1) {
      if (this.currentPage > parseInt(this.pager[this.pager.length - 2])) {
        startpage = this.currentPage - 6;
      } else if (this.currentPage < parseInt(this.pager[1])) {
        startpage = this.currentPage;
      }
    } else {
      startpage = 1;
    }
    if (startpage != 0) {
      this.pager = [];
      if (startpage != 1) {
        this.pager.push('..');
      }
      for (let i = startpage; i <= this.lastPage && i < 7 + startpage; i++) {
        this.pager.push(i.toString());
      }
      if (parseInt(this.pager[this.pager.length - 1]) - this.lastPage != 0) {
        this.pager.push('...');
      }
    }
  }

  private nextpage(page: string) {
    let startpage = 0;
    if (typeof parseInt(page) === 'number' && !isNaN(parseInt(page))) {
      this.currentPage = parseInt(page);
    } else {
      if (page === '...') {
        this.currentPage = parseInt(this.pager[this.pager.length - 2]) + 1;
      } else if (page === '..') {
        this.currentPage = parseInt(this.pager[1]) - 1;
      }
    }
    this.refreshPager();
    this.pageChanged.emit(this.currentPage);
  }
}
