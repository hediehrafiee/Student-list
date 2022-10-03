import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  DialogModule,
  FeedInputModule,
  FormModule,
  FundamentalNgxCoreModule,
  InputGroupModule,
} from '@fundamental-ngx/core';
import { StudentListComponent } from './student-list/student-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentListTableComponent } from './student-list/student-list-table/student-list-table.component';
import { AddStudentButtonComponent } from './student-list/add-student-button/add-student-button.component';
import { FilterPipe } from './pipes/filter.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    StudentListTableComponent,
    AddStudentButtonComponent,
    FilterPipe,

    HighlightDirective,
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
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  exports: [HighlightDirective],
  bootstrap: [AppComponent],
})
export class AppModule {}
