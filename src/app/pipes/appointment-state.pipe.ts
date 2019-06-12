import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'appointmentState'
})
export class AppointmentStatePipe implements PipeTransform {

  transform(status: string, costStatus: string, startAt: number): string {
    return status === 'inactive' ? 'لغو شده' : costStatus === 'notpaid' ? 'منتظر پرداخت' : startAt < new Date().getTime() ? 'انجام شده' : 'منتظر انجام';
  }

}
