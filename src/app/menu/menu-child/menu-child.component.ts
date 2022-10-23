import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TabsService } from '../../services/tabs.service';

@Component({
  selector: 'app-menu-child',
  templateUrl: './menu-child.component.html',
  styleUrls: ['./menu-child.component.scss'],
})
export class MenuChildComponent {
  @Input() tab: any;
  @Output() selectedTabChanged = new EventEmitter<number>();
  public selectedTab: number = 0;
  constructor() {}
  selectTab(id: number): void {
    this.selectedTab = id;
    this.selectedTabChanged.emit(id);
  }
}
