import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

import { StudentList } from '../interfaces/student.interface';

@Injectable({
  providedIn: 'root',
})
export class StudentListService {
  private _itemsPerPage$ = new BehaviorSubject<number>(3);
  private _currentPage$ = new BehaviorSubject<number>(1);

  private _studentList$ = new BehaviorSubject<StudentList[]>([]);
  public itemsPerPageOptions: number[] = [3, 6, 9];

  constructor() {
    this._studentList$.next([
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
    ]);
  }

  public get itemsPerPage$(): Observable<number> {
    return this._itemsPerPage$;
  }

  public get currentPage$(): Observable<number> {
    return this._currentPage$;
  }

  public get totalItems$(): Observable<number> {
    return this._studentList$.asObservable().pipe(map((c) => c.length));
  }

  public get students$(): Observable<StudentList[]> {
    return combineLatest([
      this._studentList$,
      this._itemsPerPage$,
      this._currentPage$,
    ]).pipe(
      map(([list, perPage, currPage]) => {
        return list.slice((currPage - 1) * perPage, currPage * perPage);
      })
    );
  }

  public addStudent(student: StudentList): void {
    this._studentList$.next(this._studentList$.value.concat(student));
  }

  public delete(indexes: number[]): void {
    if (!indexes) return;

    let studentList: StudentList[] = this._studentList$.value;
    const sortIndexes = indexes.sort(function (a, b) {
      return b - a;
    });
    for (let index of sortIndexes) {
      studentList.splice(index, 1);
    }

    this._studentList$.next([...studentList]);
  }

  public newPageClicked(pageNumber: number): void {
    this._currentPage$.next(pageNumber);
  }

  public itemsPerPageChange(value: number): void {
    this._itemsPerPage$.next(value);
  }
}
