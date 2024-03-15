import { Pipe, PipeTransform } from '@angular/core';
import { InvoiceInterface } from '../../users/types/userTypes';

@Pipe({
  name: 'sortInvoices'
})
export class SortInvoicesPipe implements PipeTransform {

  transform(invoices: InvoiceInterface[] | undefined): InvoiceInterface[] | undefined {
    if (invoices == undefined) return invoices;
    return invoices.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).reduce((accumulator, currentValue) => {
      if (!accumulator.includes(accumulator[accumulator.findIndex(acc => acc.invoiceId == currentValue.invoiceId)])) {
        return [...accumulator, currentValue];
      }
      return accumulator;
    }, [] as InvoiceInterface[]);
  }

}
