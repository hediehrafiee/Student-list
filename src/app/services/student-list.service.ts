import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { StudentList } from '../interfaces/student.interface';

@Injectable({
  providedIn: 'root',
})
export class StudentListService {
  public studentListChange = new BehaviorSubject<StudentList[]>([]);

  displayedRows: any[];
  public totalItems = 3;
  public itemsPerPage = 3;
  public currentPage = 1;
  public itemsPerPageOptions: number[] = [3, 6, 9];

  public get students(): Observable<StudentList[]> {
    return this.studentListChange.asObservable();
  }

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

  constructor() {
    this.studentListChange.next(this.studentList);
  }

  public addStudent(student: StudentList): void {
    this.studentList.push(student);
    console.log('next');
    this.studentListChange.next([...this.studentList]);
  }

  public delete(indexes: number[]): void {
    if (!indexes) return;

    const sortIndexes = indexes.sort(function (a, b) {
      return b - a;
    });

    for (let index of sortIndexes) {
      this.studentList.splice(index, 1);
    }

    this.studentListChange.next([...this.studentList]);
  }

  public newPageClicked(pageNumber: number): void {
    this.currentPage = pageNumber;
    const firstDisplayedRow = (pageNumber - 1) * this.itemsPerPage;
    this.displayedRows = this.studentList.slice(
      firstDisplayedRow,
      firstDisplayedRow + this.itemsPerPage
    );
  }

  public itemsPerPageChange(value: number): void {
    this.itemsPerPage = value;
    this.newPageClicked(this.currentPage);
  }
}
