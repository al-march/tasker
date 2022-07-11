package models

type ProjectManager struct {
	ID        uint `gorm:"primarykey"`
	ProjectID uint `json:"projectId"`

	InvitedUsers  []User `gorm:"many2many:project_invited_users"`
	MemberedUsers []User `gorm:"many2many:project_membered_users"`
}

func (pm ProjectManager) Dto() ProjectManagerDto {
	invitedUsers := entitiesToDto[UserDto](pm.InvitedUsers)
	memberedUsers := entitiesToDto[UserDto](pm.MemberedUsers)

	return ProjectManagerDto{
		ID:            pm.ID,
		ProjectID:     pm.ProjectID,
		InvitedUsers:  invitedUsers,
		MemberedUsers: memberedUsers,
	}
}

type ProjectManagerDto struct {
	ID            uint      `json:"id"`
	ProjectID     uint      `json:"projectId"`
	InvitedUsers  []UserDto `json:"invitedUsers"`
	MemberedUsers []UserDto `json:"memberedUsers"`
}
