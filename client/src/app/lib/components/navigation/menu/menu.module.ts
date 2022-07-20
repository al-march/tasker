import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent, MenuItem } from './menu.component';


@NgModule({
  declarations: [
    MenuComponent,
    MenuItem
  ],
  exports: [
    MenuComponent,
    MenuItem
  ],
  imports: [
    CommonModule
  ]
})
export class MenuModule {}
