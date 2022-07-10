import { Injectable } from '@angular/core';
import { ApiRoute, BaseApiService } from '@app/core/services';
import { LoginDto, LoginResponseDto, RegistrationDto, UserDto } from '@app/core/dto';

@ApiRoute('auth')
@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseApiService {

  registration(dto: RegistrationDto) {
    return this.http.post<UserDto>(`${this.url}/registration`, dto);
  }

  login(dto: LoginDto) {
    return this.http.post<LoginResponseDto>(`${this.url}/login`, dto);
  }
}
