import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TaskDto } from '@app/core/dto';
import { trigger } from '@angular/animations';
import { SlideAnimation } from '@app/core/animations';

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
  ]
})
export class TaskComponent implements OnInit {

  @Input()
  task!: TaskDto;

  constructor() { }

  ngOnInit(): void {
  }
}
