import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { TaskDto } from '@app/core/dto';
import { FormControl } from '@angular/forms';
import { OnInputChange } from '@ng-daisy/decorators/input';
import { animate, style, transition, trigger } from '@angular/animations';
import { SlideAnimation } from '@app/core/animations';
import { TaskService } from '@app/core/services';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slide', SlideAnimation({
      duration: {
        enter: '240ms',
        leave: '100ms'
      }
    })),
    trigger('menu', [
      transition(':enter', [
        style({
          overflow: 'hidden',
          transform: `scale(0.9) translateY(10px)`,
          opacity: 0,
        }),
        animate(`200ms ease-out`, style({
          overflow: 'hidden',
          transform: 'scale(1) translateY(0)',
          opacity: 1,
        })),
      ]),
    ])
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
