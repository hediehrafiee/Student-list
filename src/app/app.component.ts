import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { menu } from './const/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'test-barsa';
  @ViewChild('content', { read: ViewContainerRef })
  content: ViewContainerRef;
  // public menusItems: Menu[] = [
  //   {
  //     icon: 'employee',
  //     value: StudentListComponent,
  //   },
  //   {
  //     icon: 'appointment-2',
  //     value: TestComponent,
  //   },
  //   {
  //     icon: 'settings',
  //     value: 'setting',
  //     children: [
  //       {
  //         title: 'Link 1',
  //         value: 'LinkOne',
  //       },
  //       {
  //         title: 'Link 2',
  //         value: 'LinkTwo',
  //       },
  //       {
  //         title: 'Link 3',
  //         value: 'LinkThree',
  //       },
  //     ],
  //   },
  //   {
  //     icon: 'donut-chart',
  //     value: 'donutChart',
  //   },
  // ];

  private menu = menu;
  public tabs: any = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  public selectMenu(value?: any) {
    if (!value) return;

    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(value);
    this.content.clear();
    this.content.createComponent(componentFactory);
  }

  ngOnInit(): void {
    const findTaggedGroup = (
      this.menu.items[0].items[0].items as Array<any>
    ).find((item: any) => item.Type === 'TabbedGroup');

    let test = this.convertMenu2(findTaggedGroup.items);
    console.log(test);

    // this.convertMenu(findTaggedGroup.items);
    // console.log(this.tabs);
    this.convertMenu3(findTaggedGroup.items);
    console.log(this.tabs);
  }

  level = 0;
  convertMenu2(items: any) {
    return items.reduce((perv: any, current: any, index: number) => {
      perv.push({
        title: current.Title,

        id: this.level,

        xtype: current.xtype,

        type: current.Type,
        children:
          current.items && current.items.length
            ? this.convertMenu2(current.items)
            : [],
      });

      return perv;
    }, []);
  }

  findTab: number = -1;
  findTabChild: number = -1;
  convertMenu(items: any, parent = 0) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].Type === 'LayoutGroup') {
        this.findTab = this.tabs.findIndex(
          (tab: any) => tab.title && tab.parent < parent
        );
        // if (this.findTab !== -1)
        //   this.findTabChild = this.tabs[this.findTab].child?.findIndex(
        //     (tab: any) => tab.title && tab.parent < parent
        //   );
      }

      if (
        this.findTab !== -1 &&
        this.findTabChild !== -1 &&
        items[i].Title &&
        items[i].Type === 'LayoutGroup'
      ) {
        if (items[i].TextVisible?.toString() === 'false') return;
        console.log(
          'here',
          this.tabs[this.findTab].child[this.findTabChild].child
        );
        this.tabs[this.findTab].child[this.findTabChild].child.push({
          title: items[i].Title,
          parent: parent,
          child: [],
        });
      } else if (
        this.findTab !== -1 &&
        items[i].Title &&
        items[i].Type === 'LayoutGroup'
      ) {
        if (items[i].TextVisible?.toString() === 'false') return;
        this.tabs[this.findTab].child.push({
          title: items[i].Title,
          parent: parent,
          child: [],
        });
      } else if (items[i].Title && items[i].Type === 'LayoutGroup') {
        this.tabs.push({
          title: items[i].Title,
          parent: parent,
          child: [],
        });
      }

      if (items[i].items) {
        this.convertMenu(items[i].items, parent + 1);
      }
    }
  }

  id: number = 0;
  convertMenu3(items: any, parent = 0) {
    for (let item of items) {
      if (
        item.Type === 'LayoutGroup' &&
        item.Title &&
        item.TextVisible?.toString() !== 'false'
      ) {
        this.id++;

        this.tabs.push({
          title: item.Title,

          id: this.id,

          parent: parent,
        });
      }

      if (item.items)
        this.convertMenu3(
          item.items,
          item.Type === 'LayoutGroup' && item.Title ? this.id : parent
        );
    }
  }
}
