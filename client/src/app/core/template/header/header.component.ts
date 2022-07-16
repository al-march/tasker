import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TemplateService } from '@app/core/template';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  constructor(
    private template: TemplateService
  ) { }

  ngOnInit(): void {
  }

  toggleDrawer() {
    this.template.toggleDrawer();
  }
}
