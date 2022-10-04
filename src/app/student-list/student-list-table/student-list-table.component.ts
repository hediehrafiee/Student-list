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
  private selectIndex: number;

  filterVal = '';
  @Input() studentList: StudentList[] = [];
  @Output() public deleteStudent: EventEmitter<number> =
    new EventEmitter<number>();

  delete(): void {
    this.deleteStudent.emit(this.selectIndex);
  }

  select(index: number, event: MouseEvent): void {
    this.selectIndex = index;
    // using rangeSelector utility to be able to select multiple rows while "shift" is pressed
    const checkedToggled = !this.studentList[index].checked;
    this._rangeSelector.onRangeElementToggled(index, event);
    this._rangeSelector.applyValueToEachInRange(
      (idx) => (this.studentList[idx].checked = checkedToggled)
    );
  }
}
