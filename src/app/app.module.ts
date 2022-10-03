import { NgModule } from '@angular/core';
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
import { HighlighterPipe } from './pipes/highlighter.pipe';

@NgModule({
  declarations: [AppComponent, StudentListComponent, StudentListTableComponent, AddStudentButtonComponent, FilterPipe, HighlighterPipe],
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
