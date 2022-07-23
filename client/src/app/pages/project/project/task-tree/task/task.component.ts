import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy
} from '@angular/core';
import { TaskDto } from '@app/core/dto';
import { trigger } from '@angular/animations';
import { SlideAnimation } from '@app/core/animations';
import { filter, map, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '@app/core/services';
import { Dialog } from '@angular/cdk/dialog';
import { TaskEditModalComponent } from './task-edit-modal/task-edit-modal.component';

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
export class TaskComponent implements AfterContentInit, OnDestroy {

  @Input()
  task!: TaskDto;

  task$ = this.route.queryParamMap.pipe(
    map(map => map.get('taskId')),
    filter(id => this.task.id === +(id || '0')),
    switchMap(() => this.open(this.task))
  );

  private destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private dialog: Dialog,
    private ref: ChangeDetectorRef
  ) { }

  ngAfterContentInit() {
    this.task$
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  open(task: TaskDto) {
    return this.dialog
      .open<TaskDto>(TaskEditModalComponent, {
        data: {task},
        disableClose: true,
        width: '90vw',
        height: '90vh'
      }).closed.pipe(
        tap((task) => this.save(task))
      );
  }

  async save(task?: TaskDto) {
    if (task) {
      this.task = task;
      this.ref.markForCheck();
    }
    await this.close();
  }

  close() {
    return this.router.navigate([], {
      queryParams: {
        taskId: null
      },
      queryParamsHandling: 'merge'
    });
  }
}
