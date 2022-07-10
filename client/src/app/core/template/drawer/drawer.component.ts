import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProjectService } from '@app/core/services';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawerComponent implements OnInit {

  projects$ = this.projects.getAll();

  constructor(
    private projects: ProjectService
  ) { }

  ngOnInit(): void {
  }

}
