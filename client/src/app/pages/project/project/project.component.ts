import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, merge, Observable, of, switchMap } from 'rxjs';
import { ProjectStore } from '@app/core/services';
import { ProjectDto } from '@app/core/dto';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'flex-1 h-full overflow-hidden'
  }
})
export class ProjectComponent {

  private onProjectsUpdate$ = this.projectStore.state$.pipe(
    switchMap(state => {
      const id = this.route.snapshot.paramMap.get('id');
      return of(state.map.get(parseInt(id || '0')));
    })
  );

  private onRouteChange$ = this.route.paramMap.pipe(
    map(map => map.get('id')),
    filter(id => !!id),
    switchMap(id => this.projectStore.getOne(+id!))
  );

  project$: Observable<ProjectDto | undefined> = merge(
    this.onProjectsUpdate$,
    this.onRouteChange$
  );

  constructor(
    private route: ActivatedRoute,
    private projectStore: ProjectStore,
  ) { }
}
