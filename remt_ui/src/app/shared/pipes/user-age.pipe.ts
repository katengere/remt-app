import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userAge'
})
export class UserAgePipe implements PipeTransform {

  transform(value: Date | any): number {
    if(typeof value === 'number' || value == null) return value;
    const year = new Date().getTime() - new Date(value).getTime();
    return Math.round(year/31536000000);
  }

}
