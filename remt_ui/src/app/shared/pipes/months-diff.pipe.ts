import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthsDiff'
})
export class MonthsDiffPipe implements PipeTransform {

  transform(value: string): string {
    const [start, end] = value.split('/');
    const st = new Date(start).getTime(), en = new Date(end).getTime();
    if (en < Date.now()) {
      return 'Done';
    }
    let diff = en - st;
    const days = diff / 86400000;
    if (days % 30 == 0) {
      return Math.floor(days / 30).toString();
    }
    const remainder = days % 30
    return Math.floor(days / 30).toString() + ' and ' + remainder + (remainder > 1 ? ' days' : ' day');
  }

}
