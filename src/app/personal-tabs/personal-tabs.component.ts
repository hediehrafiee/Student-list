import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { RtlService } from '@fundamental-ngx/core';
import { Subscription } from 'rxjs';
import { Components } from '../const/components';
import { TabsService } from '../services/tabs.service';

@Component({
  selector: 'app-personal-tabs',
  templateUrl: './personal-tabs.component.html',
  styleUrls: ['./personal-tabs.component.scss'],
})
export class PersonalTabsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('content', { read: ViewContainerRef })
  content: ViewContainerRef;

  public tabs: any = [];

  private tabsId: number = 0;

  public personalComponents: any = Components;

  private subscription = new Subscription();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private rtlService: RtlService,
    private readonly tabsService: TabsService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.rtlService.rtl.next(true);

    const tabs = this.tabsService.getTabs().subscribe((data: any): void => {
      const findTaggedGroup = (data.items[0].items[0].items as Array<any>).find(
        (item: any) => item.Type === 'TabbedGroup'
      );

      this.convertMenu(findTaggedGroup.items);
      this.tabs = this.convertTabs(this.tabs);
      this.tabs.unshift({ title: 'اصلی', id: 0, children: [] });
      console.log(this.tabs);
      this.cd.detectChanges();
    });

    this.subscription.add(tabs);
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

  public selectMenu(id: number) {
    const selectedComponent = this.personalComponents[id];
    if (!selectedComponent) return;

    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(selectedComponent);
    this.content.clear();
    this.content.createComponent(componentFactory);
  }

  ngAfterViewInit() {
    const selectedTabs = this.tabsService.tabSelectedUpdate$.subscribe(
      (id: number) => {
        this.selectMenu(id);
      }
    );

    this.subscription.add(selectedTabs);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
