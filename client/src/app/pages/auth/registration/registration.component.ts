import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService, RegistrationDto } from '@app/core/services';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit {
  user: RegistrationDto = {
    login: '',
    password: '',
    name: ''
  };

  constructor(
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.registration(this.user).subscribe(data => {
    });
  }

}
