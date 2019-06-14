import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AppointmentCancellComponent} from './appointment-cancell.component';

describe('AppointmentCancellComponent', () => {
  let component: AppointmentCancellComponent;
  let fixture: ComponentFixture<AppointmentCancellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentCancellComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentCancellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
