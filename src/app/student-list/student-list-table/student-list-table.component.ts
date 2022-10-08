import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RangeSelector } from '@fundamental-ngx/core/utils';
import { StudentList } from '../../interfaces/student.interface';

@Component({
  selector: 'app-student-list-table',
  templateUrl: './student-list-table.component.html',
  styleUrls: ['./student-list-table.component.scss'],
})
export class StudentListTableComponent {
  private readonly _rangeSelector = new RangeSelector();
  @Input() studentList: StudentList[] = [];
  @Input() filterVal: string = '';
  @Output() public selectedIndex: EventEmitter<Array<number>> =
    new EventEmitter<Array<number>>();

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
