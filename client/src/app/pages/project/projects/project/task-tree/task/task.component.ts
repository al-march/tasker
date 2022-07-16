import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TaskDto } from '@app/core/dto';
import { animate, style, transition, trigger } from '@angular/animations';
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

  constructor() { }

  ngOnInit(): void {
  }
}
