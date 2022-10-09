import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, take } from 'rxjs';

import { StudentList } from '../interfaces/student.interface';

@Injectable({
  providedIn: 'root',
})
export class StudentListService {
  private itemsPerPage$ = new BehaviorSubject<number>(3);
  private currentPage$ = new BehaviorSubject<number>(1);

  private studentList$ = new BehaviorSubject<StudentList[]>([]);
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
    {
      name: 'hoda',
      family: 'Rafiee',
      age: '37',
      score: '20',
      checked: false,
    },
    {
      name: 'hasty',
      family: 'Rafiee',
      age: '37',
      score: '20',
      checked: false,
    },
    {
      name: 'helia',
      family: 'Rafiee',
      age: '37',
      score: '20',
      checked: false,
    },
  ];

  private totalItems$ = new BehaviorSubject<number>(this.studentList.length);

  constructor() {
    this.studentList$.next(this.studentList);
  }

  public get students$(): Observable<StudentList[]> {
    return this.studentList$.asObservable();
  }

  public get itemsPerPage(): number {
    return this.itemsPerPage$.value;
  }

  public get currentPage(): Observable<number> {
    return this.currentPage$;
  }

  public get totalItems(): Observable<number> {
    return this.totalItems$;
  }

  public addStudent(student: StudentList): void {
    this.studentList.push(student);
    this.studentList$.next([...this.studentList]);
    this.totalItems$.next(this.studentList.length);

    this.newPageClicked(this.currentPage$.value);
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
    this.totalItems$.next(this.studentList.length);
    this.newPageClicked(this.currentPage$.value);
  }

  public newPageClicked(pageNumber: number): void {
    this.currentPage$.next(pageNumber);
    const firstDisplayedRow = (pageNumber - 1) * this.itemsPerPage;
    console.log(this.studentList);
    of(this.studentList)
      .pipe(
        take(1),
        map((pArray) => {
          return pArray.filter(
            (p, i) =>
              i >= firstDisplayedRow &&
              i < firstDisplayedRow + this.itemsPerPage
          );
        })
      )
      .subscribe((events) => {
        this.studentList$.next(events);
      });
  }

  public itemsPerPageChange(value: number): void {
    this.itemsPerPage$.next(value);
    this.newPageClicked(1);
  }
}
