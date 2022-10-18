import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() tabs: any;
  @Output() public selectedTab: EventEmitter<number> =
    new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  selectTab(id: number): void {
    console.log('here', id);
    this.selectedTab.emit(id);
  }
}
