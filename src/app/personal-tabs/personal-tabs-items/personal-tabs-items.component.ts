import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-personal-tabs-items',
  templateUrl: './personal-tabs-items.component.html',
  styleUrls: ['./personal-tabs-items.component.scss'],
})
export class PersonalTabsItemsComponent implements OnInit {
  @ViewChild('content', { read: ViewContainerRef })
  content: ViewContainerRef;

  @Input() items: Observable<any[]>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,

    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.items.subscribe((item) => console.log('item', item));
  }

  public selectMenu(id: number) {
    const selectedComponent = this.items;
    if (!selectedComponent) return;

    // const componentFactory =
    //   this.componentFactoryResolver.resolveComponentFactory(selectedComponent);
    // this.content.clear();
    // this.content.createComponent(componentFactory);
    this.cd.detectChanges();
  }
}
