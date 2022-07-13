import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { ProjectService } from '@app/core/services';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'flex-1'
  }
})
export class ProjectComponent implements OnInit {
  project$ = this.route.paramMap.pipe(
    map(map => map.get('id')),
    filter(id => !!id),
    switchMap(id => this.projectService.get(+id!))
  );

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
  }

}
