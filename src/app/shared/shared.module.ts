import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TogglePasswordDirective } from './directives/toggle-password.directive';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    TogglePasswordDirective,
    NavbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TogglePasswordDirective,
    NavbarComponent
  ]
})
export class SharedModule { }
