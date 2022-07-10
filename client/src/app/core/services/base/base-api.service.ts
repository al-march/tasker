import { Injectable } from '@angular/core';
import { Config } from '@app/core/services';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  get url() {
    return this.config.host;
  }

  constructor(
    public config: Config,
    public http: HttpClient
  ) { }
}
