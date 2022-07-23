import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { TaskDto } from '@app/core/dto';
import { TaskService } from '@app/core/services';
import { first } from 'rxjs';

interface DialogData {
  task: TaskDto;
}

@Component({
  selector: 'app-task-edit-modal',
  templateUrl: './task-edit-modal.component.html',
  styleUrls: ['./task-edit-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskEditModalComponent implements OnInit {

  task?: TaskDto;

  constructor(
    @Inject(DIALOG_DATA) public data: DialogData,
    public dialogRef: DialogRef,
    private taskService: TaskService
  ) {
    this.task = data.task;
  }

  ngOnInit(): void {
    this.dialogRef.backdropClick
      .pipe(first())
      .subscribe(() => this.close());
  }

  close() {
    this.save().subscribe(() => {
      this.dialogRef.close(this.task);
    });
  }

  save() {
    return this.taskService.update(this.task!);
  }
}
