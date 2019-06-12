import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'currencyFormater'
})
export class CurrencyFormaterPipe implements PipeTransform {

  transform(value: number): string {
    return Intl.NumberFormat('fa').format(value) + ' تومان';
  }

}
