import { TagDto } from '@app/core/dto';

export interface ProjectDto {
  id: number;
  userId: number;
  title: string;
  description: string;
  tags: TagDto[],
  createdAt: string;
  updatedAt: string;
}

export interface ProjectCreateDto {
  title: string;
  description: string;
  tags?: TagDto[],
}
