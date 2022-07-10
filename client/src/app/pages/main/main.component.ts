import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProjectService } from '@app/core/services';
import { ProjectDto } from '@app/core/dto';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'flex-1'
  }
})
export class MainComponent implements OnInit {

  projects: ProjectDto[] = [];

  constructor(
    private projectService: ProjectService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.projectService.getAll().subscribe(projects => {
      this.projects = projects;
      this.ref.markForCheck();
    });
  }

}
