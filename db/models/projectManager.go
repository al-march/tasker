package models

type ProjectManager struct {
	ID        uint `gorm:"primarykey"`
	ProjectID uint `json:"projectId"`

	InvitedUsers  []User `gorm:"many2many:project_invited_users"`
	MemberedUsers []User `gorm:"many2many:project_membered_users"`
}

func (pm ProjectManager) Dto() ProjectManagerDto {
	invitedUsers := EntitiesToDto[UserDto](pm.InvitedUsers)
	memberedUsers := EntitiesToDto[UserDto](pm.MemberedUsers)

	return ProjectManagerDto{
		ID:            pm.ID,
		ProjectID:     pm.ProjectID,
		InvitedUsers:  invitedUsers,
		MemberedUsers: memberedUsers,
	}
}

type ProjectManagerDto struct {
	ID            uint      `json:"id,omitempty"`
	ProjectID     uint      `json:"projectId,omitempty"`
	InvitedUsers  []UserDto `json:"invitedUsers,omitempty"`
	MemberedUsers []UserDto `json:"memberedUsers,omitempty"`
}
