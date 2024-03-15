import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysRemain'
})
export class DaysRemainPipe implements PipeTransform {

  transform(value: any): number | string {
    const from = new Date(value.from);
	  const to =  new Date(value.to);
	  const diff = to.getTime() - Date.now();
	  const days = Math.ceil(diff/86400000);
    return days>0 ? days : 'Done'
  }

}
