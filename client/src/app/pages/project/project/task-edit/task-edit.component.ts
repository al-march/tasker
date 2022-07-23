import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '@app/core/services';
import { filter, first, map, switchMap, tap } from 'rxjs';
import { Dialog } from '@angular/cdk/dialog';
import { TaskEditModalComponent } from './task-edit-modal/task-edit-modal.component';
import { TaskDto } from '@app/core/dto';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskEditComponent implements OnInit {

  task$ = this.route.paramMap.pipe(
    map(map => map.get('id')),
    filter(id => !!id),
    switchMap(id => this.taskService.get(id as string)),
    switchMap(task => this.open(task))
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private dialog: Dialog
  ) { }

  ngOnInit(): void {
    this.task$.pipe(first()).subscribe();
  }

  close() {
    const url = this.router.url
      .slice(1, -1)
      .split('/')
      .slice(0, 2);
    return this.router.navigate(url);
  }

  open(task: TaskDto) {
    return this.dialog
      .open(TaskEditModalComponent, {
        data: {task},
        disableClose: true,
        width: '90vw',
        height: '90vh'
      }).closed.pipe(
        tap(() => this.close())
      );
  }
}
