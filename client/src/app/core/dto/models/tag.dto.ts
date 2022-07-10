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
