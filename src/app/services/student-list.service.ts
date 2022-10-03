import { Injectable, OnInit } from '@angular/core';
import { StudentList } from '../interfaces/student.interface';

@Injectable({
  providedIn: 'root',
})
export class StudentListService {
  public studentList: StudentList[] = [
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
}
