import { Pipe, PipeTransform } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(values: any[] = [], searchTerm: string) {
    if (searchTerm) {
      values = values.filter((row: any): boolean => {
        const keys = Object.keys(row);
        return !!keys.find((key) =>
          row[key].toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    return values;
  }
}
