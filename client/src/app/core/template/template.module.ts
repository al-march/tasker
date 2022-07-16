import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { DrawerComponent } from './drawer/drawer.component';
import { PageComponent } from './page/page.component';
import { CdkScrollableModule } from '@angular/cdk/scrolling';


@NgModule({
  declarations: [
    HeaderComponent,
    DrawerComponent,
    PageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CdkScrollableModule
  ],
  exports: [
    HeaderComponent,
    DrawerComponent,
    PageComponent
  ]
})
export class TemplateModule {}
