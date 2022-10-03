import { Pipe, PipeTransform } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(values: any[] = [], searchTerm: string = '', studentList: any) {
    const filterRows = (row: any): boolean => {
      const keys = Object.keys(row);
      return !!keys.find((key) =>
        row[key].toLowerCase().includes(searchTerm.toLowerCase())
      );
    };

    if (searchTerm) {
      values = studentList.filter((row: AnyCatcher) => filterRows(row));
    }

    return values;
  }
}
