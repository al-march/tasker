import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './projects/project/project.component';
import { TaskTreeComponent } from './projects/project/task-tree/task-tree.component';

@NgModule({
  declarations: [
    ProjectComponent,
    ProjectsComponent,
    TaskTreeComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule
  ]
})
export class ProjectModule {}
