import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProjectService } from '@app/core/services';
import { TemplateService } from '@app/core/template/template.service';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawerComponent implements OnInit {

  projects$ = this.projects.getAll();
  drawer$ = this.template.drawer$;

  constructor(
    private projects: ProjectService,
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
