import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AuthService } from '@app/core/services';
import { RegistrationDto } from '@app/core/dto';

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
    public authService: AuthService,
    public router: Router
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.registration(this.user)
      .pipe(catchError((err) => {
        this.handleError(err);
        throw new Error(err);
      }))
      .subscribe(() => {
        this.router.navigate(['auth', 'login']);
      });
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
