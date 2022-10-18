import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu-child',
  templateUrl: './menu-child.component.html',
  styleUrls: ['./menu-child.component.scss'],
})
export class MenuChildComponent implements OnInit {
  @Input() tab: any;
  @Output() public selectedTab: EventEmitter<number> =
    new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  selectTab(id: number): void {
    this.selectedTab.emit(id);
  }
}
