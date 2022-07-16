import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from './tag.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagRoutingModule } from './tag-routing.module';
import { BadgeModule } from '@ng-daisy/data-display';



@NgModule({
  declarations: [
    TagComponent
  ],
  exports: [
    TagComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        TagRoutingModule,
        ReactiveFormsModule,
        BadgeModule
    ]
})
export class TagModule { }
