import { Injectable } from '@angular/core';
import { ApiRoute, BaseApiService } from '@app/core/services';

@ApiRoute('tag')
@Injectable({
  providedIn: 'root'
})
export class TagService extends BaseApiService {
}
