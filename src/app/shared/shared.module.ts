import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TogglePasswordDirective } from './directives/toggle-password.directive';

@NgModule({
  declarations: [
    TogglePasswordDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TogglePasswordDirective
  ]
})
export class SharedModule { }
