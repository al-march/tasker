import { UserDto } from '@app/core/dto';

export interface LoginDto {
  login: string,
  password: string,
}

export interface RegistrationDto {
  login: string,
  password: string,
  name: string
}

export interface LoginResponseDto {
  token: string;
  user: UserDto;
}
