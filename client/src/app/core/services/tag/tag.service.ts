import { Injectable } from '@angular/core';
import { ApiRoute, BaseApiService } from '@app/core/services';
import { TagColorDto, TagCreateDto, TagDto } from '@app/core/dto';

@ApiRoute('tag')
@Injectable({
  providedIn: 'root'
})
export class TagService extends BaseApiService {

  create(dto: TagCreateDto) {
    return this.http.post<TagDto>(`${this.url}`, dto);
  }

  update(dto: TagDto) {
    return this.http.put<TagDto>(`${this.url}/${dto.id}`, dto);
  }

  delete(id: number) {
    return this.http.delete<TagDto>(`${this.url}/${id}`);
  }

  getAll() {
    return this.http.get<TagDto[]>(`${this.url}/all`);
  }

  getColor() {
    return this.http.get<TagColorDto[]>(`${this.url}/colors`);
  }
}
