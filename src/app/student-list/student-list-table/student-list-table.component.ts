import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RangeSelector } from '@fundamental-ngx/core/utils';
import { PageData } from '../../interfaces/page.interface';
import { StudentList } from '../../interfaces/student.interface';
import { StudentListService } from '../../services/student-list.service';

@Component({
  selector: 'app-student-list-table',
  templateUrl: './student-list-table.component.html',
  styleUrls: ['./student-list-table.component.scss'],
})
export class StudentListTableComponent {
  items = ['Zero', 'One', 'Two', 'Three'];

  private readonly _rangeSelector = new RangeSelector();

  @Input() studentList: StudentList[] = [];
  @Input() filterVal: string = '';

  @Input() itemsPerPageOptions: Array<number>;
  @Input() currentPage: number;
  @Input() totalItems: number;
  @Input() itemsPerPage: number;

  @Output() public selectedIndex: EventEmitter<Array<number>> =
    new EventEmitter<Array<number>>();
  @Output() public newPageClicked: EventEmitter<number> =
    new EventEmitter<number>();
  @Output() public itemsPerPageChange: EventEmitter<number> =
    new EventEmitter<number>();

  displayedRows: any[];

  constructor(public studentListService: StudentListService) {}

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

  public pageClicked(page: number) {
    this.newPageClicked.emit(page);
  }

  public itemsPerPageClicked(value: number) {
    this.itemsPerPageChange.emit(value);
  }

  public onDrop(event: any) {
    moveItemInArray(this.studentList, event.previousIndex, event.currentIndex);
  }

  drop(event: CdkDragDrop<StudentList[]>) {
    moveItemInArray(this.studentList, event.previousIndex, event.currentIndex);
  }
}
