import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StudentList } from '../../interfaces/student.interface';

@Component({
  selector: 'app-student-list-table',
  templateUrl: './student-list-table.component.html',
  styleUrls: ['./student-list-table.component.scss'],
})
export class StudentListTableComponent {
  filterVal = '';

  @Input() studentList: StudentList[] = [];
  // @Input() set setStudentList(students: StudentList[]) {
  //   console.log(students);
  //   this.studentList = JSON.parse(JSON.stringify(students));
  // }

  @Output() public deleteStudent: EventEmitter<number> =
    new EventEmitter<number>();

  delete(index: number): void {
    this.deleteStudent.emit(index);
  }
}
