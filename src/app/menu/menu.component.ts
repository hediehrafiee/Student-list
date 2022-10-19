import { Component, Input, OnInit } from '@angular/core';
import { TabsService } from '../services/tabs.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(private tabsService: TabsService) {}
  @Input() tabs: any;

  public tabId: number;

  ngOnInit(): void {
    const selectedTabs = this.tabsService.tabSelectedUpdate$.subscribe(
      (id: number) => {
        this.tabId = id;
      }
    );

    // this.subscription.add(selectedTabs);
  }
}
