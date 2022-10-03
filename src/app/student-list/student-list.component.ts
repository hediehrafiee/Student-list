import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DialogService } from '@fundamental-ngx/core';
import { StudentList } from '../interfaces/student.interface';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
  studentList: StudentList[] = [];
  @ViewChild('addStudentDialog') _addStudentDialog:
    | TemplateRef<any>
    | undefined;

  constructor(
    private _dialogService: DialogService,
    private formBuilder: FormBuilder
  ) {}

  addStudentForm = this.formBuilder.group({
    name: [''],
    family: [''],
    age: [''],
    score: [''],
  });

  ngOnInit(): void {
    this.studentList = [
      {
        name: 'hedieh',
        family: 'Rafiee',
        age: '27',
        score: '18',
      },
      {
        name: 'hossein',
        family: 'Rafiee',
        age: '33',
        score: '20',
      },
      {
        name: 'hamed',
        family: 'Rafiee',
        age: '37',
        score: '20',
      },
    ];
  }

  add(): void {
    const dialogRef = this._dialogService.open(
      this._addStudentDialog as TemplateRef<any>,
      {
        responsivePadding: true,
        focusTrapped: true,
        verticalPadding: true,
      }
    );
    dialogRef.afterClosed.subscribe(
      (result) => {
        console.log(this.addStudentForm.value);
        this.studentList.push(this.addStudentForm.value);
      },
      (error) => {}
    );
  }

  deleteStudent(index: number): void {
    console.log('here');
    this.studentList.splice(index, 1);
    console.log(this.studentList);
  }
}
