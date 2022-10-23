import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-personal-tabs-items',
  templateUrl: './personal-tabs-items.component.html',
  styleUrls: ['./personal-tabs-items.component.scss'],
})
export class PersonalTabsItemsComponent implements OnChanges {
  @ViewChild('content', { read: ViewContainerRef, static: true })
  content: ViewContainerRef;

  @Input() items: any[];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { items } = changes;
    if (items && !items.firstChange) this.selectMenu(items.currentValue);
  }

  public selectMenu(items: any) {
    const selectedComponent = items[0];
    if (!selectedComponent) return;

    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(selectedComponent);
    this.content.clear();
    this.content.createComponent(componentFactory);
    this.cd.detectChanges();
  }
}
