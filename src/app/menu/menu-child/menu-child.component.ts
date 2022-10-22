import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TabsService } from '../../services/tabs.service';

@Component({
  selector: 'app-menu-child',
  templateUrl: './menu-child.component.html',
  styleUrls: ['./menu-child.component.scss'],
})
export class MenuChildComponent {
  @Input() tab: any;
  public selectedTab: number = 0;
  constructor(private tabService: TabsService) {}
  selectTab(id: number): void {
    this.tabService.selectTab(id);
    this.selectedTab = id;
  }
}
