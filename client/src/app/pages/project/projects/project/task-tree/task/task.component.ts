import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { TaskDto } from '@app/core/dto';
import { FormControl } from '@angular/forms';
import { OnInputChange } from '@ng-daisy/decorators/input';
import { trigger } from '@angular/animations';
import { SlideAnimation } from '@app/core/animations';
import { TaskService } from '@app/core/services';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slide', SlideAnimation),
  ]
})
export class TaskComponent implements OnInit {

  @Input()
  task!: TaskDto;

  title = new FormControl();

  @OnInputChange('task')
  onTaskChange() {
    this.title.setValue(this.task.title);
  }

  constructor(
    private taskService: TaskService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  updateTask(updatedDto: Partial<TaskDto>) {
    const dto = {...this.task, ...updatedDto};
    this.taskService.update(dto).subscribe((data) => {
      this.task.title = data.title;
      this.ref.markForCheck();
    });
  }
}
