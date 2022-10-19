import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { RtlService } from '@fundamental-ngx/core';
import { Components } from './const/components';

import { TabsService } from './services/tabs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'test-barsa';
  @ViewChild('content', { read: ViewContainerRef })
  content: ViewContainerRef;

  public tabs: any = [];

  private tabsId: number = 0;

  public personalComponents: any = Components;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private rtlService: RtlService,
    private readonly tabsService: TabsService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.rtlService.rtl.next(true);
    this.tabsService.getTabs().subscribe((data: any): void => {
      const findTaggedGroup = (data.items[0].items[0].items as Array<any>).find(
        (item: any) => item.Type === 'TabbedGroup'
      );

      this.convertMenu(findTaggedGroup.items);
      this.tabs = this.convertTabs(this.tabs);
      this.tabs.unshift({ title: 'اصلی', id: 0, children: [] });
      this.cd.detectChanges();
    });
  }

  public selectMenu(id: number) {
    const selectedComponent = this.personalComponents[id];
    if (!selectedComponent) return;

    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(selectedComponent);
    this.content.clear();
    this.content.createComponent(componentFactory);
  }

  private convertTabs(items: any, id = 0) {
    return items
      .filter((item: any) => item.parentID === id)
      .map((item: any) => ({
        ...item,
        children: this.convertTabs(items, item.id),
      }));
  }

  private convertMenu(items: any, parent = 0) {
    for (let item of items) {
      if (
        item.xtype === 'Ly.LayoutTabPage' &&
        item.Title &&
        item.TextVisible?.toString() !== 'false'
      ) {
        this.tabsId++;

        this.tabs.push({
          title: item.Title,

          id: this.tabsId,

          parentID: parent,
        });
      }

      if (item.items)
        this.convertMenu(
          item.items,
          item.Type === 'LayoutGroup' && item.Title ? this.tabsId : parent
        );
    }
  }

  ngAfterViewInit() {
    this.tabsService.tabSelectedUpdate$.subscribe((id: number) => {
      this.selectMenu(id);
    });
  }
  // convertMenu2(items: any) {
  //   return items.reduce((perv: any, current: any, index: number) => {
  //     perv.push({
  //       title: current.Title,

  //       xtype: current.xtype,

  //       type: current.Type,
  //       children:
  //         current.items && current.items.length
  //           ? this.convertMenu2(current.items)
  //           : [],
  //     });

  //     return perv;
  //   }, []);
  // }

  // findTab: number = -1;
  // findTabChild: number = -1;
  // convertMenu(items: any, parent = 0) {
  //   for (let i = 0; i < items.length; i++) {
  //     if (items[i].Type === 'LayoutGroup') {
  //       this.findTab = this.tabs.findIndex(
  //         (tab: any) => tab.title && tab.parent < parent
  //       );
  //       // if (this.findTab !== -1)
  //       //   this.findTabChild = this.tabs[this.findTab].child?.findIndex(
  //       //     (tab: any) => tab.title && tab.parent < parent
  //       //   );
  //     }

  //     if (
  //       this.findTab !== -1 &&
  //       this.findTabChild !== -1 &&
  //       items[i].Title &&
  //       items[i].Type === 'LayoutGroup'
  //     ) {
  //       if (items[i].TextVisible?.toString() === 'false') return;
  //       console.log(
  //         'here',
  //         this.tabs[this.findTab].child[this.findTabChild].child
  //       );
  //       this.tabs[this.findTab].child[this.findTabChild].child.push({
  //         title: items[i].Title,
  //         parent: parent,
  //         child: [],
  //       });
  //     } else if (
  //       this.findTab !== -1 &&
  //       items[i].Title &&
  //       items[i].Type === 'LayoutGroup'
  //     ) {
  //       if (items[i].TextVisible?.toString() === 'false') return;
  //       this.tabs[this.findTab].child.push({
  //         title: items[i].Title,
  //         parent: parent,
  //         child: [],
  //       });
  //     } else if (items[i].Title && items[i].Type === 'LayoutGroup') {
  //       this.tabs.push({
  //         title: items[i].Title,
  //         parent: parent,
  //         child: [],
  //       });
  //     }

  //     if (items[i].items) {
  //       this.convertMenu(items[i].items, parent + 1);
  //     }
  //   }
  // }
}
