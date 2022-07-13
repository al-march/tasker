import { TaskDto } from '@app/core/dto';

export interface SectionDto {
  id: number;
  projectId: number;
  title: string;
  tasks: TaskDto[];
}
