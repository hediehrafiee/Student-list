import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  concatMap,
  EMPTY,
  expand,
  mapTo,
  Observable,
  reduce,
  tap,
  timer,
  toArray,
} from 'rxjs';

import { StudentList } from '../interfaces/student.interface';

@Injectable({
  providedIn: 'root',
})
export class StudentListService {
  private itemsPerPage$ = new BehaviorSubject<number>(3);
  private currentPage$ = new BehaviorSubject<number>(1);
  private studentList$ = new BehaviorSubject<StudentList[]>([]);

  displayedRows: any[];

  public itemsPerPageOptions: number[] = [3, 6, 9];

  private studentList: StudentList[] = [
    {
      name: 'hedieh',
      family: 'Rafiee',
      age: '27',
      score: '18',
      checked: false,
    },
    {
      name: 'hossein',
      family: 'Rafiee',
      age: '33',
      score: '20',
      checked: false,
    },
    {
      name: 'hamed',
      family: 'Rafiee',
      age: '37',
      score: '20',
      checked: false,
    },
  ];

  public totalItems = this.studentList.length;

  constructor() {
    this.studentList$.next(this.studentList);
  }

  public get students$(): Observable<StudentList[]> {
    return this.studentList$.asObservable();
  }

  public get itemsPerPage(): number {
    return this.itemsPerPage$.value;
  }

  public get currentPage(): number {
    return this.currentPage$.value;
  }

  public addStudent(student: StudentList): void {
    this.studentList.push(student);
    console.log('next');
    this.studentList$.next([...this.studentList]);
  }

  public delete(indexes: number[]): void {
    if (!indexes) return;

    const sortIndexes = indexes.sort(function (a, b) {
      return b - a;
    });

    for (let index of sortIndexes) {
      this.studentList.splice(index, 1);
    }

    this.studentList$.next([...this.studentList]);
  }

  public newPageClicked(pageNumber: number): void {
    this.currentPage$.next(pageNumber);

    // const firstDisplayedRow = (pageNumber - 1) * this.itemsPerPage;
    // this.displayedRows = this.studentList.slice(
    //   firstDisplayedRow,
    //   firstDisplayedRow + this.itemsPerPage
    // );
  }

  public itemsPerPageChange(value: number): void {
    this.itemsPerPage$.next(value);
  }
}
