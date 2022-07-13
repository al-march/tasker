import { TagDto } from '@app/core/dto';

export interface TaskDto {
  createdAt: string;
  description: string;
  id: number;
  projectId: number;
  status: string;
  tags: TagDto[];
  title: string;
  updatedAt: string;
  userId: number;
}
