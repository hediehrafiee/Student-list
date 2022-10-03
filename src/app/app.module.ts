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

@NgModule({
  declarations: [AppComponent, StudentListComponent],
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
