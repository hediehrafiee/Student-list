import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '@fundamental-ngx/core';
import { Observable } from 'rxjs';
import { StudentList } from '../interfaces/student.interface';
import { StudentListService } from '../services/student-list.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
  public searchVal = '';

  public selectedIndex: Array<number>;
  public studentList$: Observable<StudentList[]>;
  @ViewChild('addStudentDialog') _addStudentDialog:
    | TemplateRef<any>
    | undefined;

  @ViewChild('deleteStudentDialog') _deleteStudentDialog: TemplateRef<any>;

  constructor(
    private _dialogService: DialogService,
    private formBuilder: FormBuilder,

    public readonly studentListService: StudentListService
  ) {}

  addStudentForm = this.formBuilder.group({
    name: ['', Validators.required],
    family: ['', Validators.required],
    age: ['', Validators.required],
    score: ['', Validators.required],
    checked: [false],
  });

  ngOnInit(): void {
    this.studentList$ = this.studentListService.students;
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
        this.studentListService.addStudent(this.addStudentForm.value);
      },
      (error) => {}
    );
  }

  delete(): void {
    if (!this.selectedIndex) return;

    const dialogRef = this._dialogService.open(
      this._deleteStudentDialog as TemplateRef<any>,
      {
        responsivePadding: true,
        focusTrapped: true,
        verticalPadding: true,
      }
    );
    dialogRef.afterClosed.subscribe(
      (result) => {
        this.studentListService.delete(this.selectedIndex);
      },
      (error) => {}
    );
  }
}
