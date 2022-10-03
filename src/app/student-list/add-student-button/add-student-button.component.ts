import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-student-button',
  templateUrl: './add-student-button.component.html',
  styleUrls: ['./add-student-button.component.scss'],
})
export class AddStudentButtonComponent implements OnInit {
  @Output() public addStudent: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}

  add() {
    this.addStudent.emit(true);
  }
}
