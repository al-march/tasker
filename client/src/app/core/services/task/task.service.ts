import { Injectable } from '@angular/core';
import { ApiRoute, BaseApiService } from '@app/core/services';
import { TaskCreateDto, TaskDto } from '@app/core/dto';

@ApiRoute('task')
@Injectable({
  providedIn: 'root'
})
export class TaskService extends BaseApiService {
  create(dto: TaskCreateDto) {
    return this.http.post(`${this.url}`, dto);
  }

  update(dto: TaskDto) {
    return this.http.put<TaskDto>(`${this.url}/${dto.id}`, dto);
  }
}
