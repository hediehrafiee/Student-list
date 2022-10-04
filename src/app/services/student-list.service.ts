import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { StudentList } from '../interfaces/student.interface';

@Injectable({
  providedIn: 'root',
})
export class StudentListService {
  public studentListChange = new BehaviorSubject<StudentList[]>([]);

  public get students(): Observable<StudentList[]> {
    return this.studentListChange.asObservable();
  }

  private studentList: StudentList[] = [
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

  constructor() {
    this.studentListChange.next(this.studentList);
  }

  public addStudent(student: StudentList): void {
    this.studentList.push(student);
    this.studentListChange.next(this.studentList);
  }

  public delete(index: number): void {
    this.studentList.splice(index, 1);
    this.studentListChange.next(this.studentList);
  }
}
