import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskDto } from '@app/core/dto';
import { trigger } from '@angular/animations';
import { SlideAnimation } from '@app/core/animations';

@Component({
  selector: 'app-task-tree',
  templateUrl: './task-tree.component.html',
  styleUrls: ['./task-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slide', SlideAnimation),
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
