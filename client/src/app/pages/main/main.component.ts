import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProjectService } from '@app/core/services';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {

  constructor(
    private projects: ProjectService
  ) { }

  ngOnInit(): void {
    this.projects.getAll().subscribe(projects => {
      console.log(projects);
    })
  }

}
