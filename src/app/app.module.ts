import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  DialogModule,
  FeedInputModule,
  FormModule,
  FundamentalNgxCoreModule,
  InputGroupModule,
} from '@fundamental-ngx/core';

import { StudentListComponent } from './student-list/student-list.component';
import { StudentListTableComponent } from './student-list/student-list-table/student-list-table.component';
import { AddStudentButtonComponent } from './student-list/add-student-button/add-student-button.component';

import { HighlightDirective } from './directives/highlight.directive';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    StudentListTableComponent,
    AddStudentButtonComponent,

    HighlightDirective,
      TestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FundamentalNgxCoreModule,
    DialogModule,
    FormModule,
    FeedInputModule,
    InputGroupModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DragDropModule,
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  exports: [HighlightDirective],
  bootstrap: [AppComponent],
})
export class AppModule {}
