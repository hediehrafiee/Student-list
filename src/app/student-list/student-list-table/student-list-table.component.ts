import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RangeSelector } from '@fundamental-ngx/core/utils';
import { StudentList } from '../../interfaces/student.interface';
import { StudentListService } from '../../services/student-list.service';

@Component({
  selector: 'app-student-list-table',
  templateUrl: './student-list-table.component.html',
  styleUrls: ['./student-list-table.component.scss'],
})
export class StudentListTableComponent implements OnInit {
  private readonly _rangeSelector = new RangeSelector();
  studentList: StudentList[] = [];
  @Input() set studentList$(value: StudentList[]) {
    this.studentListService.newPageClicked(this.studentListService.currentPage);
    this.studentList = value;
  }

  @Input() filterVal: string = '';
  @Output() public selectedIndex: EventEmitter<Array<number>> =
    new EventEmitter<Array<number>>();

  displayedRows: any[];

  constructor(public studentListService: StudentListService) {}

  ngOnInit(): void {
    this.studentListService.newPageClicked(1);
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
