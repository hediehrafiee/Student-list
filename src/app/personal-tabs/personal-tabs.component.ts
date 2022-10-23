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
import { Observable, pluck, Subscription } from 'rxjs';
import { Components } from '../const/components';
import { TabsService } from '../services/tabs.service';

@Component({
  selector: 'app-personal-tabs',
  templateUrl: './personal-tabs.component.html',
  styleUrls: ['./personal-tabs.component.scss'],
})
export class PersonalTabsComponent implements OnInit {
  public tabs$: Observable<any[]>;
  public selectedTabId$: Observable<number>;
  public selectedTabItems$: Observable<any>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private rtlService: RtlService,
    private readonly tabsService: TabsService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.tabs$ = this.tabsService.menu$;
    this.selectedTabId$ = this.tabsService.tabSelectedId$;
    this.selectedTabItems$ = this.tabsService.tabSelected$?.pipe(
      pluck('items')
    );
    this.selectedTabItems$.subscribe((x) => console.log(x));
    console.log(this.selectedTabItems$);
    this.rtlService.rtl.next(true);
  }

  public onTabChanged(id: number): void {
    this.tabsService.selectTab(id);
  }
}
