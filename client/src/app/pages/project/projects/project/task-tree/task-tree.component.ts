import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskDto } from '@app/core/dto';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-task-tree',
  templateUrl: './task-tree.component.html',
  styleUrls: ['./task-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slide', [
      transition(':enter', [
        style({
          overflow: 'hidden',
          transform: 'translateY(-30px)',
          opacity: 0,
          height: '0px',
        }),
        animate('180ms ease-out', style({
          overflow: 'hidden',
          transform: 'translateY(0)',
          opacity: 1,
          height: '*',
        })),
      ]),
      transition(':leave', [
        style({
          overflow: 'hidden',
          transform: 'translateY(0)',
          height: '*',
          opacity: 1,
        }),
        animate('120ms cubic-bezier(.4,0,.2,1)', style({
          overflow: 'hidden',
          transform: 'translateY(30px)',
          opacity: 0,
          height: '0px',
        })),
      ]),
    ]),
  ]
})
export class TaskTreeComponent implements OnInit {

  @Input()
  task?: TaskDto;

  @Input()
  isChild = false;

  @Input()
  showTree = false;

  @Output()
  showTreeChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleShow(isShow: boolean) {
    this.showTree = isShow;
    this.showTreeChange.emit(isShow);
  }
}
