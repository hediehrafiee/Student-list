import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  SecurityContext,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[highlight]',
})
export class HighlightDirective {
  @Input('highlight') searchTerm: string = '';

  @HostBinding('innerHtml')
  content: string = '';
  constructor(private el: ElementRef, private sanitizer: DomSanitizer) {}

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
          const sanitzed = this.sanitizer.sanitize(
            SecurityContext.HTML,
            newText
          );
          this.content = sanitzed as string;
        }
      }
    }
  }
}
