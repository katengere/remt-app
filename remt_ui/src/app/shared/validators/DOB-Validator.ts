import { AbstractControl } from '@angular/forms';

export function DOBValidator(control: AbstractControl<Date>) : { [key: string]:any } | null{
  if(!control.value)return { DOB: true }
  if(typeof control.value !== 'object') return null;
  const year = new Date().getFullYear() - control.value.getFullYear();
  return year >= 18 && year<120 ? null : { DOB: true };
}