export interface TagDto {
  id: number;
  userId: number;
  title: string;
  color: TagColorDto;
}

export interface TagColorDto {
  id: number;
  value: string;
}

export interface TagCreateDto{
  title: string;
  color?: number;
}
