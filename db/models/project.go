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

	Tasks []Task `gorm:"foreignKey:ProjectID"`
	Tags  []Tag  `gorm:"many2many:project_tags"`
}

func (p Project) Dto() ProjectDto {
	return ProjectDto{
		ID:          p.ID,
		UserID:      p.UserID,
		Title:       p.Title,
		Description: p.Description,
		Tags:        p.Tags,
		CreatedAt:   p.CreatedAt,
		UpdatedAt:   p.UpdatedAt,
	}
}

type ProjectDto struct {
	ID          uint      `json:"id"`
	UserID      uint      `json:"userId"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Tags        []Tag     `json:"tags"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
}
