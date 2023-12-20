import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNames'
})
export class FormatNamesPipe implements PipeTransform {

  transform(value: string | undefined): string {
    const names = value?.split(' ');
      const capN = names?.map(n=>n.charAt(0).toUpperCase()+n.substring(1,n.length));
      return capN?.join(' ') as string;
  }
  
}
