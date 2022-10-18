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
  RtlService,
} from '@fundamental-ngx/core';

import { StudentListComponent } from './student-list/student-list.component';
import { StudentListTableComponent } from './student-list/student-list-table/student-list-table.component';
import { AddStudentButtonComponent } from './student-list/add-student-button/add-student-button.component';

import { HighlightDirective } from './directives/highlight.directive';
import { MenuComponent } from './menu/menu.component';
import { MenuChildComponent } from './menu/menu-child/menu-child.component';
import { PersonalPanelComponent } from './menu-components/personal-panel/personal-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    StudentListTableComponent,
    AddStudentButtonComponent,

    HighlightDirective,
    MenuComponent,
    MenuChildComponent,
    PersonalPanelComponent,
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
  providers: [RtlService],
  exports: [HighlightDirective],
  bootstrap: [AppComponent],
})
export class AppModule {}
