import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalTabsComponent } from './personal-tabs/personal-tabs.component';
import { StudentListComponent } from './student-list/student-list.component';

const routes: Routes = [
  { path: 'student-list', component: StudentListComponent },
  { path: 'personal-tabs', component: PersonalTabsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
