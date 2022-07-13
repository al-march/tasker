import { Color } from '@ng-daisy/types';

export interface TagDto {
  id: number;
  userId: number;
  title: string;
  color: TagColorDto;
}

export interface TagColorDto {
  id: number;
  value: Color;
}

export interface TagCreateDto {
  title: string;
  color?: number;
}
