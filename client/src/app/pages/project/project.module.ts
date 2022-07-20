import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkMenuModule } from '@angular/cdk/menu';
import { CdkScrollableModule } from '@angular/cdk/scrolling';

import { BadgeModule } from '@ng-daisy/data-display';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectsComponent } from './projects';
import { ProjectComponent, TaskComponent, TaskTreeComponent } from './project';
import { TemplateModule } from '@app/core/template';
import { MenuModule } from '@ng-daisy/components/navigation';


@NgModule({
  declarations: [
    ProjectComponent,
    ProjectsComponent,
    TaskTreeComponent,
    TaskComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CdkMenuModule,
    CdkScrollableModule,
    TemplateModule,
    BadgeModule,
    MenuModule,
  ]
})
export class ProjectModule {}
