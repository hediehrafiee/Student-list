import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, Subject } from 'rxjs';

import { StudentList } from '../interfaces/student.interface';

@Injectable({
  providedIn: 'root',
})
export class StudentListService {
  private _itemsPerPage$ = new BehaviorSubject<number>(3);
  private _currentPage$ = new BehaviorSubject<number>(1);
  private _totalItems$ = new BehaviorSubject<number>(0);

  private _studentList$ = new BehaviorSubject<StudentList[]>([]);
  public itemsPerPageOptions: number[] = [3, 6, 9];
  private _searchTerm = new BehaviorSubject<string>('');

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
    return this._itemsPerPage$.asObservable();
  }

  public get currentPage$(): Observable<number> {
    return this._currentPage$.asObservable();
  }

  public get totalItems$(): Observable<number> {
    return this._totalItems$.asObservable();
  }

  public get students$(): Observable<StudentList[]> {
    return combineLatest([
      this._studentList$,
      this._searchTerm,
      this._itemsPerPage$,
      this._currentPage$,
    ]).pipe(
      map(([studentList, searchTerm, perPage, currPage]) => {
        let list: StudentList[] = studentList;

        if (searchTerm) {
          list = studentList.filter((row: any): boolean => {
            const keys = Object.keys(row);
            return !!keys.find((key) =>
              row[key]
                .toString()
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            );
          });
        }

        this._totalItems$.next(list.length);
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

  public filterStudents(searchTerm: string): void {
    this._searchTerm.next(searchTerm);
  }
}
