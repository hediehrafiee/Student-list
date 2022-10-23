import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TabsService } from '../services/tabs.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Output() tabChanged = new EventEmitter<number>();

  constructor() {}
  @Input() tabs: any;
  public onTabChanged(id: number) {
    this.tabChanged.emit(id);
  }
}
