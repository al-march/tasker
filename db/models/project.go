package models

import (
	"gorm.io/gorm"
	"time"
)

type Project struct {
	gorm.Model
	UserID      uint
	Title       string
	Description string

	Tasks   []Task         `gorm:"foreignKey:ProjectID"`
	Tags    []Tag          `gorm:"many2many:project_tags"`
	Manager ProjectManager `gorm:"foreignKey:ProjectID"`
}

func (p Project) Dto() ProjectDto {
	tags := EntitiesToDto[TagDto](p.Tags)

	return ProjectDto{
		ID:          p.ID,
		UserID:      p.UserID,
		Title:       p.Title,
		Description: p.Description,
		Tags:        tags,
		CreatedAt:   p.CreatedAt,
		UpdatedAt:   p.UpdatedAt,

		Manager: p.Manager.Dto(),
	}
}

type ProjectDto struct {
	ID          uint      `json:"id"`
	UserID      uint      `json:"userId"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Tags        []TagDto  `json:"tags"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`

	Manager ProjectManagerDto `json:"manager,omitempty"`
}
