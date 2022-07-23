import { Injectable } from '@angular/core';
import { ProjectCreateDto, ProjectDto, TaskDto } from '@app/core/dto';
import { BehaviorSubject, map, of, switchMap } from 'rxjs';
import { ProjectService, TaskService } from '@app/core/services';

export type ProjectsMap = Map<number, ProjectDto>;

interface ProjectState {
  list: ProjectDto[];
  map: ProjectsMap;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectStore {
  private _projectsState$ = new BehaviorSubject<ProjectState>({
    list: [],
    map: new Map<number, ProjectDto>()
  });

  state$ = this._projectsState$.asObservable();

  get snapshot() {
    return this._projectsState$.value;
  }

  constructor(
    private project: ProjectService,
    private task: TaskService
  ) {}

  getAll() {
    const state = this.snapshot;
    if (state.list.length) {
      return of(state);
    } else {
      return this.forceGetAll();
    }
  }

  forceGetAll() {
    return this.project.getAll().pipe(map((list) => {
      const state = this.snapshot;
      this._projectsState$.next({...state, list});
      return state;
    }));
  }

  getOne(id: number) {
    const state = this.snapshot;
    if (state.map.has(id)) {
      return of(state.map.get(id));
    }

    return this.forceGetOne(id);
  }

  forceGetOne(id: number) {
    const state = this.snapshot;
    return this.project.get(id).pipe(map((project) => {
      state.map.set(project.id, project);
      this._projectsState$.next({...state, map: new Map(state.map)});
      return project;
    }));
  }

  updateItem(dto: ProjectDto) {
    return this.project.update(dto).pipe(map((project) => {
      const state = this.snapshot;
      state.map.set(project.id, project);
      const updated: ProjectState = {
        list: [...state.map.values()],
        map: new Map(state.map)
      };
      this._projectsState$.next(updated);
      return updated;
    }));
  }

  addItem(dto: ProjectCreateDto) {
    return this.project.create(dto).pipe(map((project) => {
      const state = this.snapshot;
      state.map.set(project.id, project);
      const updated: ProjectState = {
        list: [...state.map.values()],
        map: new Map(state.map)
      };
      this._projectsState$.next(updated);
      return updated;
    }));
  }

  updateTask(dto: TaskDto) {
    const state = this.snapshot;
    const project = state.map.get(dto.projectId);

    if (!project) {
      console.error(`Project with id: ${dto.projectId} not found`);
    }

    return this.task.update(dto).pipe(
      switchMap(() => this.forceGetOne(dto.projectId))
    )
  }
}
