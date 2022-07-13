import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProjectService } from '@app/core/services';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements OnInit {

  projects$ = this.projects.getAll();

  constructor(
    private projects: ProjectService
  ) { }

  ngOnInit(): void {
  }

}
