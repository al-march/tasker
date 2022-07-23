import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkMenuModule } from '@angular/cdk/menu';
import { DialogModule } from '@angular/cdk/dialog';
import { CdkScrollableModule } from '@angular/cdk/scrolling';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectsComponent } from './projects';
import {
  ProjectComponent,
  TaskComponent,
  TaskEditComponent,
  TaskEditModalComponent,
  TaskTreeComponent
} from './project';
import { TemplateModule } from '@app/core/template';
import { MenuModule } from '@ng-daisy/components/navigation';
import { BadgeModule } from '@ng-daisy/data-display';


@NgModule({
  declarations: [
    ProjectComponent,
    ProjectsComponent,
    TaskTreeComponent,
    TaskComponent,
    TaskEditComponent,
    TaskEditModalComponent,
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CdkMenuModule,
    CdkScrollableModule,
    DialogModule,
    TemplateModule,
    BadgeModule,
    MenuModule,
  ]
})
export class ProjectModule {}
