import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProjectStore } from '@app/core/services';
import { TemplateService } from '@app/core/template';
import { map } from 'rxjs';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawerComponent implements OnInit {

  projects$ = this.projects.state$.pipe(
    map(state => state.list)
  );
  drawer$ = this.template.drawer$;

  constructor(
    private projects: ProjectStore,
    private template: TemplateService,
  ) { }

  ngOnInit(): void {
  }

  open() {
    this.template.openDrawer();
  }

  close() {
    this.template.closeDrawer();
  }

  toggle() {
    this.template.toggleDrawer();
  }

}
