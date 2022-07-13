import { SectionDto, TagDto, TaskDto, UserDto } from '@app/core/dto';

export interface ProjectDto {
  id: number;
  userId: number;
  title: string;
  description: string;
  tags: TagDto[];
  sections: SectionDto[];
  tasks: TaskDto[];
  manager: ProjectManagerDto;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectCreateDto {
  title: string;
  description: string;
  tags?: TagDto[],
}

export interface ProjectManagerDto {
  id: number;
  projectId: number;
  invitedUsers: UserDto[];
  memberedUsers: UserDto[];
}
