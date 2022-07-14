import { TagDto } from '@app/core/dto';

export interface TaskDto {
  id: number;
  userId: number;
  projectId: number;

  status: string;
  title: string;
  description: string;

  tags: TagDto[];
  subTasks: TaskDto[];

  updatedAt: string;
  createdAt: string;
}

export interface TaskCreateDto {
  projectId: number;
  title: string;
  description: string;
  tags: TagDto[];
}
