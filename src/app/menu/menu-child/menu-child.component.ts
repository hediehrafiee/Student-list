import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-child',
  templateUrl: './menu-child.component.html',
  styleUrls: ['./menu-child.component.scss'],
})
export class MenuChildComponent implements OnInit {
  @Input() tab: any;

  constructor() {}

  ngOnInit(): void {}
}
