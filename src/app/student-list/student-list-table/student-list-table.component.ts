import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MenuComponent } from '@fundamental-ngx/core';
import { RangeSelector } from '@fundamental-ngx/core/utils';
import { StudentList } from '../../interfaces/student.interface';

@Component({
  selector: 'app-student-list-table',
  templateUrl: './student-list-table.component.html',
  styleUrls: ['./student-list-table.component.scss'],
})
export class StudentListTableComponent implements OnInit {
  private readonly _rangeSelector = new RangeSelector();
  @Input() studentList: StudentList[] = [];
  @Input() filterVal: string = '';
  @Output() public selectedIndex: EventEmitter<Array<number>> =
    new EventEmitter<Array<number>>();

  displayedRows: any[];
  totalItems = 3;
  itemsPerPage = 3;
  currentPage = 1;
  itemsPerPageOptions: number[] = [3, 6, 9];

  ngOnInit(): void {
    this.newPageClicked(1);
  }

  newPageClicked(pageNumber: number): void {
    this.currentPage = pageNumber;
    const firstDisplayedRow = (pageNumber - 1) * this.itemsPerPage;
    this.displayedRows = this.studentList.slice(
      firstDisplayedRow,
      firstDisplayedRow + this.itemsPerPage
    );
  }

  itemsPerPageChange(value: number): void {
    this.itemsPerPage = value;
    this.newPageClicked(this.currentPage);
  }

  select(index: number, event: MouseEvent, checked: boolean): void {
    // using rangeSelector utility to be able to select multiple rows while "shift" is pressed
    const checkedToggled = !this.studentList[index].checked;
    this._rangeSelector.onRangeElementToggled(index, event);
    this._rangeSelector.applyValueToEachInRange((idx) => {
      this.studentList[idx].checked = checkedToggled;
    });

    const selectIndex = this.studentList.reduce(
      (results: number[], item: StudentList, index: number) => {
        if (item.checked) results.push(index);
        return results;
      },
      []
    );

    this.selectedIndex.emit(selectIndex);
  }
}
