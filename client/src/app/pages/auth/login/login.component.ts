import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService, LoginDto } from '@app/core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  user: LoginDto = {
    login: '',
    password: ''
  };

  constructor(
    public authService: AuthService,
    public router: Router
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.login(this.user).subscribe(data => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      this.router.navigate(['']);
    });
  }
}
