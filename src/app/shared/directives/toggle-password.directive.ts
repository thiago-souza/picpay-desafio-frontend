import { Directive, ElementRef } from '@angular/core';

import { eyeTemplateShow, eyeTemplateHide } from '../utils/templates/icon-password-template';

@Directive({
  selector: '[appTogglePassword]'
})
export class TogglePasswordDirective {

  private _show = false;
  constructor(private el: ElementRef) {
    this.setup();
  }
  toggle(span: HTMLElement) {
    this._show = !this._show;
    if (this._show) {
      this.el.nativeElement.setAttribute('type', 'text');
      span.innerHTML = eyeTemplateShow;
    } else {
      this.el.nativeElement.setAttribute('type', 'password');
      span.innerHTML = eyeTemplateHide;
    }
  }
  setup() {
    const parent = this.el.nativeElement.parentNode;
    const span = document.createElement('span');

    span.innerHTML = eyeTemplateHide;
    span.addEventListener('click', () => {
      this.toggle(span);
    });
    parent.appendChild(span);
  }

}
