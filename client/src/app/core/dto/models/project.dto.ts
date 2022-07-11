import { TagDto, UserDto } from '@app/core/dto';

export interface ProjectDto {
  id: number;
  userId: number;
  title: string;
  description: string;
  tags: TagDto[];
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
