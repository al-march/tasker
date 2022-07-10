import { Injectable } from '@angular/core';
import { ApiRoute, BaseApiService } from '@app/core/services';
import { ProjectCreateDto, ProjectDto } from '@app/core/dto';

@ApiRoute('project')
@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseApiService {

  create(dto: ProjectCreateDto) {
    return this.http.post<ProjectDto>(`${this.url}`, dto);
  }

  update(dto: ProjectDto) {
    return this.http.put<ProjectDto>(`${this.url}/${dto.id}`, dto);
  }

  getAll() {
    return this.http.get<ProjectDto[]>(`${this.url}/all`);
  }

  get(id: number) {
    return this.http.get<ProjectDto>(`${this.url}/${id}`);
  }
}
