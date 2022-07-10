import { Injectable } from '@angular/core';
import { BaseApiService } from '@app/core/services';
import { LoginDto, LoginResponseDto, RegistrationDto, UserDto } from '@app/core/dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseApiService {

  registration(dto: RegistrationDto) {
    return this.http.post<UserDto>(`${this.url}/auth/registration`, dto);
  }

  login(dto: LoginDto) {
    return this.http.post<LoginResponseDto>(`${this.url}/auth/login`, dto);
  }
}
