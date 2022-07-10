import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

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

  projectId$ = this.route.paramMap.pipe(
    map(map => map.get('id'))
  );

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

}
