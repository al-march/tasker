import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProjectStore } from '@app/core/services/project/project.store';
import { map } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements OnInit {

  projects$ = this.projects.state$.pipe(
    map(state => state.list)
  );

  constructor(
    private projects: ProjectStore
  ) { }

  ngOnInit(): void {
  }

}
