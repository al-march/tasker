import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from './tag.component';
import { FormsModule } from '@angular/forms';
import { TagRoutingModule } from './tag-routing.module';



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
    TagRoutingModule
  ]
})
export class TagModule { }
