import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AuthService } from '@app/core/services';
import { LoginDto } from '@app/core/dto';

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
    this.authService.login(this.user)
      .pipe(catchError((err) => {
        this.handleError(err);
        throw new Error(err);
      }))
      .subscribe(data => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          this.router.navigate(['']);
        },
      );
  }

  handleError(err: any) {
    const status = err.status as number;

    switch (status) {
      case 404:
      case 400:
        const error: { message: string } = err.error;
        alert(error.message);
        break;
      default:
        alert('Что-то пошло не так');
    }
  }
}
