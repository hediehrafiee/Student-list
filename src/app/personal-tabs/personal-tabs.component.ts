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
import { Observable, Subscription } from 'rxjs';
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

  public personalComponents: any = Components;

  private subscription = new Subscription();

  public tabs$: Observable<any[]>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private rtlService: RtlService,
    private readonly tabsService: TabsService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.tabs$ = this.tabsService.tabs$;
    console.log(this.tabs$);

    this.rtlService.rtl.next(true);
  }

  public selectMenu(id: number) {
    const selectedComponent = this.personalComponents[id];
    if (!selectedComponent) return;

    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(selectedComponent);
    this.content.clear();
    this.content.createComponent(componentFactory);
    this.cd.detectChanges();
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
