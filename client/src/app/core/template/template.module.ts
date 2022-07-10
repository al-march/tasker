import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { DrawerComponent } from './drawer/drawer.component';


@NgModule({
  declarations: [
    HeaderComponent,
    DrawerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    DrawerComponent
  ]
})
export class TemplateModule {}
