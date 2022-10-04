import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[highlight]',
})
export class HighlightDirective {
  @Input('highlight') searchTerm: string = '';

  @HostBinding('innerHtml') content: string = '';
  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.el?.nativeElement) {
      if ('searchTerm' in changes) {
        const text = (this.el.nativeElement as HTMLElement)
          .textContent as string;

        if (this.searchTerm === '') {
          this.content = text as string;
        } else {
          const regex = new RegExp(this.searchTerm);
          const newText = text.replace(regex, (match: string) => {
            return `<mark class="highlight highlighted-text">${match}</mark>`;
          });

          this.content = newText;
        }
      }
    }
  }
}
