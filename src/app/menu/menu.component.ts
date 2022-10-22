import { Component, Input } from '@angular/core';
import { TabsService } from '../services/tabs.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  constructor() {}
  @Input() tabs: any;
}
