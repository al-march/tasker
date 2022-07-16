import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TemplateService } from '@app/core/template/template.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  constructor(
    private router: Router,
    private template: TemplateService
  ) {
    this.router.events.subscribe(events => {
      if (events instanceof NavigationEnd) {
        this.template.closeDrawer();
      }
    })
  }
}
