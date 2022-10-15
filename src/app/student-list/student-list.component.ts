import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '@fundamental-ngx/core';

import {
  defer,
  EMPTY,
  expand,
  interval,
  map,
  merge,
  Observable,
  of,
  range,
  reduce,
  take,
} from 'rxjs';
import { PageData } from '../interfaces/page.interface';
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
  public students$: Observable<StudentList[]>;
  public currentPage$: Observable<number>;
  public itemsPerPage$: Observable<number>;
  public totalItems$: Observable<number>;
  public itemsPerPageOptions: Array<number> =
    this.studentListService.itemsPerPageOptions;

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
    this.students$ = this.studentListService.students$;
    this.totalItems$ = this.studentListService.totalItems$;
    this.itemsPerPage$ = this.studentListService.itemsPerPage$;
    this.currentPage$ = this.studentListService.currentPage$;
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

  public newPageClicked(page: number) {
    this.studentListService.newPageClicked(page);
  }

  public itemsPerPageChange(value: number) {
    this.studentListService.itemsPerPageChange(value);
  }

  public filterStudents(value: string) {
    this.studentListService.filterStudents(value);
  }
}
