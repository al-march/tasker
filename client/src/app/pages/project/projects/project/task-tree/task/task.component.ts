import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TaskDto } from '@app/core/dto';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent implements OnInit {

  @Input()
  task!: TaskDto;

  constructor() { }

  ngOnInit(): void {
  }

}
