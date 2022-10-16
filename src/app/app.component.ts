import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Menu } from './interfaces/menu';
import { StudentListComponent } from './student-list/student-list.component';
import { TestComponent } from './test/test.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'test-barsa';
  @ViewChild('content', { read: ViewContainerRef })
  content: ViewContainerRef;
  public menusItems: Menu[] = [
    {
      icon: 'employee',
      value: StudentListComponent,
    },
    {
      icon: 'appointment-2',
      value: TestComponent,
    },
    {
      icon: 'settings',
      value: 'setting',
      children: [
        {
          title: 'Link 1',
          value: 'LinkOne',
        },
        {
          title: 'Link 2',
          value: 'LinkTwo',
        },
        {
          title: 'Link 3',
          value: 'LinkThree',
        },
      ],
    },
    {
      icon: 'donut-chart',
      value: 'donutChart',
    },
  ];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  public selectMenu(value: any) {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(value);
    this.content.clear();
    this.content.createComponent(componentFactory);
  }
}
