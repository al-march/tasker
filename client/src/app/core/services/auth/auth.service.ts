import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '@app/core/services';

export interface LoginDto {
  login: string,
  password: string,
}

export interface RegistrationDto {
  login: string,
  password: string,
  name: string
}

export interface LoginResponse {
  token: string;
  user: UserDto;
}

export interface UserDto {
  id: number,
  login: string,
  name?: string,
  surname?: string,
  email?: string,
  phone?: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  get url() {
    return this.config.host;
  }

  constructor(
    private config: Config,
    private http: HttpClient
  ) {
  }

  registration(dto: RegistrationDto) {
    return this.http.post<UserDto>(`${this.url}/auth/registration`, dto);
  }

  login(dto: LoginDto) {
    return this.http.post<LoginResponse>(`${this.url}/auth/login`, dto);
  }
}
