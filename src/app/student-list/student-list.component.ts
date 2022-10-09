import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '@fundamental-ngx/core';

import { defer, map, Observable, take } from 'rxjs';
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

  public pageData: PageData = {} as PageData;
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

    if (this.pageData as PageData) {
      this.pageData.itemsPerPageOptions =
        this.studentListService.itemsPerPageOptions;
      this.pageData.currentPage = this.studentListService.currentPage;
      this.pageData.itemsPerPage = this.studentListService.itemsPerPage;
    }
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
}
function fetchPage(page: any): any {
  throw new Error('Function not implemented.');
}

function mergeMap(
  arg0: ({ items, nextPage }: { items: any; nextPage: any }) => any
): import('rxjs').OperatorFunction<unknown, unknown> {
  throw new Error('Function not implemented.');
}

function from(items: any) {
  throw new Error('Function not implemented.');
}

function concat(items$: any, next$: any) {
  throw new Error('Function not implemented.');
}
