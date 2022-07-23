import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, Subject, switchMap, takeUntil } from 'rxjs';
import { ProjectStore } from '@app/core/services';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'flex-1 h-full overflow-hidden'
  }
})
export class ProjectComponent implements OnInit, OnDestroy {

  project$ = this.projectStore.state$.pipe(
    map(state => {
      const id = this.route.snapshot.paramMap.get('id');
      return state.map.get(parseInt(id || '0'));
    })
  );

  private onRouteChange$ = this.route.paramMap.pipe(
    map(map => map.get('id')),
    filter(id => !!id),
    switchMap(id => this.projectStore.getOne(+id!))
  );

  private destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private projectStore: ProjectStore,
  ) { }

  ngOnInit(): void {
    this.onRouteChange$
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
