import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '@fundamental-ngx/core';
import { StudentList } from '../interfaces/student.interface';
import { StudentListService } from '../services/student-list.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
  public studentList: StudentList[] = [];
  @ViewChild('addStudentDialog') _addStudentDialog:
    | TemplateRef<any>
    | undefined;

  constructor(
    private _dialogService: DialogService,
    private formBuilder: FormBuilder,

    private readonly studentListService: StudentListService
  ) {}

  addStudentForm = this.formBuilder.group({
    name: ['', Validators.required],
    family: ['', Validators.required],
    age: ['', Validators.required],
    score: ['', Validators.required],
  });

  ngOnInit(): void {
    this.studentList = this.studentListService.studentList;
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

  delete(index: number): void {
    this.studentList.splice(index, 1);
    console.log(this.studentList);
  }
}
